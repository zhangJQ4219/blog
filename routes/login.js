let express = require('express');
let router = express.Router({});
let MD5 = require('md5-node')

let User = require('../models/User')

// 注册
router.post('/reg', function (req, res, next) {
  let result = {
    code: null,
    msg: ''
  }
  if (req.body.name.trim() !== '' && req.body.pwd.trim() !== MD5('')) {
    let user = new User({
      username: req.body.name,
      password: req.body.pwd
    })
    User.findOne({ username: req.body.name.trim() }, (err, docs) => {
      if (!err) {
        if (docs === null) {
          user.save((err) => {
            if (!err) {
              result.code = 200
              result.msg = '注册成功'
              res.send(result)
            } else {
              result.code = 500
              result.msg = '注册失败'
              res.send(result)
            }
          })
        } else {
          result.code = 500
          result.msg = '该用户已被注册'
          res.send(result)
        }
      } else {
        result.code = 500
        result.msg = '系统繁忙'
        res.send(result)
      }
    })
  } else {
    result.code = 200
    result.msg = '用户名或密码不能为空'
    res.send(result)
  }
});

// 登录
router.post('/login', function (req, res, next) {
  let result = {
    code: null,
    msg: ''
  }
  User.findOne({ username: req.body.username, password: req.body.password }, (err, docs) => {
    if (!err) {
      if (docs === null) {
        result.code = 500
        result.msg = '账号或密码错误'
      } else {
        result.code = 200
        result.msg = '登录成功'
      }
    } else {
      result.code = 500
      result.msg = '系统繁忙'
    }
    res.send(result)
  })
})

// 修改密码
router.post('/changePassword', function (req, res, next) {
  console.log(req.body)
  User.update( { username: req.body.username, password: req.body.oldPassword }, { $set: {password: req.body.newPassword} }, (err ,raw)=>{
    console.log(raw)
    if (err) {
      res.send({
        code: '500',
        msg: '系统繁忙'
      })
    } else {
      if (raw.nModified === 0) {
        res.send({
          code: '500',
          msg: '用户名或密码错误'
        })
      } else {
        res.send({
          code: '200',
          msg: '修改成功'
        })
      }
    }
  })
})
module.exports = router;
