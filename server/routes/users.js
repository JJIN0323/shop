const express = require('express')
const router = express.Router()
const async = require('async')
const { User } = require('../models/User')
const { Product } = require('../models/Product')
const { Payment } = require('../models/Payment')
const { auth } = require('../middleware/auth')

// 인증 성공시 보낼 데이터
router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    })
})

// 회원가입
router.post('/register', (req, res) => {

    const user = new User(req.body)

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


// 로그인
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: 'Auth failed, email not found'
            })

        // 비밀번호가 맞는지 체크

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: 'Wrong password' })

            // 토큰 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)
                res.cookie('w_authExp', user.tokenExp)
                res
                    .cookie('w_auth', user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    })
            })
        })
    })
})


// 로그아웃. 토큰을 지워줌으로서 로그아웃 시킴
router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '', tokenExp: '' }, (err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({
            success: true
        })
    })
})

router.post('/cart', auth, (req, res) => {
    // User collection에서 User 정보를 가져옴
    // req.user._id는 auth에서 token에 User 정보가 저장
    // middleware/auth.js
    User.findOne({ _id: req.user._id },
        (err, userInfo) => {

            let duplicate = false // 상품이 없음
        
            // 가져온 정보에서 상품이 이미 카트에 들어있는지 확인
            userInfo.cart.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true // 상품이 있음
                }
            })

            // 상품이 있으면, quantity만 +1 해줌

            if (duplicate) {
                User.findOneAndUpdate({ _id: req.user._id, 'cart.id': req.body.productId },
                { $inc: {'cart.$.quantity': 1} },
                { new : true }, // update된 정보를 받기 위함
                (err, userInfo) => {
                    if (err) return res.status(200).send(err)
                    return res.status(200).send(userInfo.cart)
                }
            )}
            // 상품이 없으면, id, quantity, date를 push 해줌
            else {
                User.findOneAndUpdate({ _id: req.user._id},
                { $push: { cart: {id: req.body.productId, quantity: 1, date: Date.now() }}},
                { new : true },
                (err, userInfo) => {
                    if (err) return res.status(400).send(err)
                    return res.status(200).send(userInfo.cart)
                }
            )}
        })
})

router.get('/removeFromCart', auth, (req, res) => {

    // 1. cart collection 안에 지우려고하는 상품을 지움
    User.findOneAndUpdate({_id: req.user._id},
        {'$pull': {'cart': { 'id': req.query.id }}},
        { new: true },
        (err, userInfo) => {
            //if (err) return res.status(200).json({ success: false, err })
            let cart = userInfo.cart
            let array = cart.map(item => {
                return item.id
            })

            // 2. product collection 안에 남아있는 상품들의 정보를 가져옴
            Product.find({_id: {$in: array}})
            .populate('writer')
            .exec((err, productInfo) => {
                return res.status(200).json({
                    productInfo,
                    cart
                })
            })
        }
    )    
})

router.post('/successBuy', auth, (req, res) => {

    // User collection에 history를 넣어줌
    let history = []
    let transactionData = {}

    //console.log('cartDetail ', req.body.cartDetail)
    
    req.body.cartDetail.forEach((item) => {
        history.push({
            id: item._id,
            productTitle: item.subject,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID,
            dateOfPurchase: Date.now()
        })
    })

    // Payment collection에 자세한 결제 정보를 넣어줌 ( auth를 거쳐서 들어온 정보 )
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    // CartPage 안에 paymentData에 정보를 가져옴
    transactionData.data = req.body.paymentData
    transactionData.product = history

    User.findOneAndUpdate({ _id: req.user._id },
        // User collection 안에 history에 저장
        // history를 저장하고, cart는 비워줌
        { $push: { history: history }, $set: { cart: [] }},
        { new: true },
        (err, user) => {
            if (err) return res.status(400).json({ success: false, err })
            
            // Payment model에 transactionData 정보 저장
            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.status(400).json({ success: false, err })

                // Product collection에 sold field 업데이트

                // 각 상품마다 몇 개의 quantity를 구매했는지 정보
                let products = []

                doc.product.forEach(item => {
                    // doc 안에 저장된 (payment.save(transactionData)에 'product' 부분) 정보를 가져와서,
                    // products에 아래 정보를 배열로 넣어줌
                    products.push({ id: item.id, quantity: item.quantity })
                })

                async.eachSeries(products, (item, callback) => {

                    Product.updateOne({ _id: item.id },
                        { $inc: { 'sold': item.quantity }},
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.status(400).json({ success: false, err })
                    return res.status(200).json({
                        success: true,
                        cart: user.cart, // 179번째 줄, user collection 안에 cart 정보
                        cartDetail: []
                    })
                })
            })
        }
    )
})


module.exports = router
