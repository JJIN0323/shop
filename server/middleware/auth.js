const { User } = require('../models/User')

let auth = (req, res, next) => {

  // 토큰에다가 쿠키에 있는 유저 정보를 저장
  let token = req.cookies.w_auth

  User.findByToken(token, (err, user) => {
    if (err) throw err
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      })

    req.token = token
    // request.user에 가져온 user 정보를 저장
    req.user = user
    next()
  })
}

module.exports = { auth }
