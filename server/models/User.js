const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const moment = require('moment')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    email: {
        type:String,
        trim:true, // 공백을 없애주는 역할
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})

// 저장하기 전에 실행
userSchema.pre('save', function( next ) {
    var user = this
    
    // 비밀번호를 변경 할 때
    if(user.isModified('password')){    
        // console.log('password changed')
        
        // salt 값을 생성
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash 
                next()
            })
        })
    } else { // 비밀번호 이외의 다른것을 변경하면 넘김
        next()
    }
})

// 비밀번호가 일치하는지 확인
userSchema.methods.comparePassword = function(plainPassword,cb){
    // 입력한 비밀번호를 bcrypt해서 일치하는지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

// Json Web Token을 이용해서 토큰 생성
userSchema.methods.generateToken = function(cb) {
    var user = this
    //console.log('user',user)
    //console.log('userSchema', userSchema)
    
    // user id와 'secretToken'을 합쳐서 고유의 토큰을 만들고,
    // 역으로 'secretToken'을 넣으면 id가 나옴
    // user._id + 'secretToken' = token
    var token =  jwt.sign(user._id.toHexString(),'secret')
    // 토큰 유효시간은 1시간
    var oneHour = moment().add(1, 'hour').valueOf()

    user.tokenExp = oneHour
    user.token = token
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

// 아이디를 Decode 해서 토큰 찾기
userSchema.statics.findByToken = function (token, cb) {
    var user = this

    jwt.verify(token,'secret',function(err, decode){
        // 유저 아이디를 이용해서 유저를 찾고
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({'_id':decode, 'token':token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }