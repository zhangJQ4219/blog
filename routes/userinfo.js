let express = require('express');
let router = express.Router();
let Userinfo = require('../models/Userinfo')
let fs = require('fs')
let uuidv1 = require('uuid')

let multer = require('multer')
// 图片上传处理
let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './upload')
  },
  filename(req, file, cb) {
    cb(null, uuidv1() + '-' + file.originalname)
  }
})
let upload = multer({ storage: storage })

// 上传
router.post('/upload', upload.single('file'), function (req, res, next) {
  res.send({ code: '200', msg: 'success', data: req.file.path.replace(/\\/g, "\/") })
})

// 删除图片
router.post('/removeImg', function (req, res, next) {
  console.log(req.body.response.data)
  fs.unlink('./' + req.body.response.data, (err) => {
    if (err) {
      res.send({ code: '500', msg: 'failure' })
    } else {
      res.send({ code: '200', msg: 'success' })
    }
  })
})
// 获取用户信息
router.get('/getUserInfo', function (req, res, next) {
  let result = {
    code: null,
    msg: '',
    data: ''
  }
  Userinfo.findOne({}, (err, docs) => {
    result.code = 200
    result.msg = 'success'
    docs.avatorImg = docs.avatorImg
    result.data = docs
    res.send(result)
  })
});

// 编辑用户信息
router.post('/editUserInfo', function (req, res, next) {
  let result = {
    code: null,
    msg: '',
    data: ''
  }
  console.log(req.body)
  if (req.body.img !== '') {
    req.body.avatorImg = req.body.img.response.data
  }
  Userinfo.update({ 'user': 'zhang' }, { $set: req.body }, (err, raw) => {
    if (!err) {
      if (raw.nModified > 0) {
        result.code = 200
        result.msg = 'success'
        result.data = '修改成功'
        res.send(result)
      } else {
        result.code = 200
        result.msg = 'success'
        result.data = '修改shib'
        res.send(result)
      }
    } else {
      result.code = 500
      result.msg = 'failure'
      result.data = '系统繁忙'
      res.send(result)
    }
  })
});

module.exports = router;
