const express = require('express')
const multer = require('multer')
const { auth } = require('../middleware/auth')
const { Product } = require('../models/Product')
const router = express.Router()

var storage = multer.diskStorage({
    // 파일 저장할 곳
    destination: function (req, file, callback) {
      callback(null, 'uploads/')
    },
    filename: function (req, file, callback) {
      callback(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
var upload = multer({ storage: storage }).single('file')

router.post('/images', auth, (req, res) => {
    
    // 프론트에서 받은 이미지 저장
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({
            success: true,
            image: res.req.file.path,
            fileName: res.req.file.filename
        })
    })
})

// index.js에서 기본 router 설정을 해둠. UploadProductPage.js [line 74]
router.post('/', (req, res) => {

    // UploadProductPage.js [line 63]에서 받아온 정보들을 DB에 저장
    const product = Product(req.body)

    product.save((err) => {
        if (err) return res.json({ success: false, err })
        return res.json({
            success: true
        })
    })
})

router.post('/products', (req, res) => {

    // parseInt는 String을 Number로 변환
    let limit = req.body.limit ? parseInt(req.body.limit) : 20
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    let term = req.body.searchTerm

    //console.log('TERM : ', term)

    // array 형태의 객체
    let findArgs = {}

    // key = categoryList / priceList
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            //console.log('routes key', key)

            findArgs[key] = req.body.filters[key]

            if (key === 'price') {
                findArgs[key] = {
                    // MongoDB 비교연산자 : ~이상
                    $gte: req.body.filters[key][0],
                    // MongoDB 비교연산자 : ~이하
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }

        }
    }
    //console.log('findArgs', findArgs)

    if (term) {
        Product.find(findArgs)
        //.find({$text: { $search: term}})
        .find({'subject': { '$regex': term, '$options': 'i' }}) // i = 대소문자 구분 없이
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if (err) return res.status(400).json({ success: false, err})
            return res.status(200).json({
                success: true,
                productInfo,
                postAmount: productInfo.length
            })
        })
    } else {
        // product collection에 저장된 상품정보를 가져오기
        Product.find(findArgs)
        .populate('writer') // ObjectID를 객체로 치환
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if (err) return res.status(400).json({ success: false, err})
            return res.status(200).json({
                success: true,
                productInfo,
                postAmount: productInfo.length
            })
        })
    }
})

router.get('/products_by_id', (req, res) => {

    let type = req.query.type
    let productIds = req.query.id

    if (type === 'array') {

        // id=12414345, 34535435435, 1235687 type='array' 를
        // productIds = ['12414345', '34535435435', '1235687'] 이렇게 바꿔줌
        let ids = req.query.id.split(',')
        
        productIds = ids.map(item => {
            return item
        })
    }

    // productId를 DB에서 찾고, 같은 Id를 가진 상품을 가져옴
    Product.find({_id: { $in: productIds }})
    .populate('writer')
    .exec((err, product) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({
            success: true, 
            product
        })
    })
})

router.post('/products_by_id', (req, res) => {

    let productIds = req.query.id
    let count = { $inc: { views: 1 }}

    Product.find({_id: productIds})
    .updateOne(count)
    .exec((err, views) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({
            success: true,
            views
            // https://velog.io/@nj_pk/mongoose-error-findOneAndUpdate-inc%EA%B0%80-%EB%91%90%EB%B0%B0%EB%A1%9C-%EB%90%98%EB%8A%94-%ED%98%84%EC%83%81
        })
    })
})

module.exports = router