const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/User.Login', function (req, res, next) {
  console.log('登陆中......')
  const sess = req.session
  const loginName = req.query.loginName
  const password = req.query.password
  User.find({loginName: loginName, password: password})
    .then(user => {
      if (user.length === 1) {
        const token = jwt.sign({loginName: loginName}, 'cgc', {
          expiresIn: 1000 * 60 * 60
        })
        req.session.regenerate((err) => {
          if (err) {
            console.log('用户名或密码错误@1')
            res.json({
              recordds: {},
              success: false,
              msg: '用户名或密码错误!'
            })
          }
          req.session.loginName = loginName
          console.log(req.session)
          res.json({
            records: user,
            toekn: token,
            success: true
          })
        })
      } else {
        console.log('用户名或密码错误@2')
        res.json({
          recordds: {},
          success: false,
          msg: '用户名或密码错误!'
        })
      }
    })
})

router.post('/User.Logout', function (req, res, next) {
  console.log('登出......')
  console.log(req.session)
  req.session.destroy((err) => {
    if (err) {
      console.log('登出失败!')
      res.json({
        success: false,
        msg: '登出失败!'
      })
      return
    }
    console.log('登出成功!')
    res.clearCookie('identityKey')
    res.json({
      success: true,
      msg: '登出成功!'
    })
  })
})

module.exports = router
