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
            fileName: res.req.file.filename,
            message: 'success!'
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
            success: true,
            message: 'success'
        })
    })
})

router.post('/products', (req, res) => {

    // parseInt는 String을 Number로 변환
    let limit = req.body.limit ? parseInt(req.body.limit) : 20
    let skip = req.body.skip ? parseInt(req.body.skip) : 0

    // product collection에 저장된 상품정보를 가져오기
    Product.find()
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
})

module.exports = router
