let express = require('express');
let router = express.Router({});
let Page = require('../models/Page')
let path = require('path')
let fs = require('fs')
let uuidv1 = require('uuid')

let multer = require('multer')
// 图片上传处理
let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './upload/index')
  },
  filename(req, file, cb) {
    cb(null, uuidv1() + '-' + file.originalname)
  }
})
let upload = multer({ storage: storage })

// 上传
router.post('/upload', upload.single('file'), function (req, res, next) {
  res.send({ code: '200', msg: 'success', data: req.file.path.replace(/\\/g, "\/")})
})

// 删除图片
router.post('/removeImg', function (req, res, next) {
  let url = req.body.response.data
  fs.unlink('./' + url,(err)=>{
    if (err) {
      res.send({ code: '500', msg: 'failure' })
    } else {
      res.send({ code: '200', msg: 'success' })
    }
  })
})



// Page.findOne({ '_id': '5bc40b9b3eb2e0233ce986e4' }, (err, docs) => {
//   router.get('/' + docs.avatorImg, function (req, res, next) {
//     images.readImg(docs.avatorImg,res)
//   })
// })

// 获取页面元素
router.get('/getPage', function (req, res, next) {
  let url = req.headers.referer
  console.log(url)
  let result = {
    code: null,
    msg: '',
    data: ''
  }
  Page.findOne({},  (err, docs) => {
    // docs.indexImg = url + docs.indexImg
    result.code = 200
    result.msg = 'success'
    result.data = docs
    res.send(result)
  })
});

// 编辑页面元素
router.post('/editPage', function (req, res, next) {
  let result = {
    code: null,
    msg: '',
    data: ''
  }
  if (req.body.img !== '') {
    req.body.avatorImg = req.body.img.response.data
  }
  console.log(req.body)
  // imgUrl = req.body.img.response.data
  Page.update({ '_id':'5bc40b9b3eb2e0233ce986e4'}, { $set: req.body}, (err, raw) => {
    if (!err) {
      if (raw.nModified > 0){
        result.code = 200
        result.msg = 'success'
        result.data = '修改成功'
        res.send(result)
      } else {
        result.code = 500
        result.msg = 'failure'
        result.data = '修改失败'
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
