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

module.exports = router
