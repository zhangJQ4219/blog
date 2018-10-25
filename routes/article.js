let express = require('express');
let router = express.Router({});
let Article = require('../models/Article')

let fs = require('fs')
let uuidv1 = require('uuid')

let multer = require('multer')
// 图片上传处理
let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './upload/article')
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
  let url = req.body.response.data
  fs.unlink('./' + url, (err) => {
    if (err) {
      res.send({ code: '500', msg: 'failure' })
    } else {
      res.send({ code: '200', msg: 'success' })
    }
  })
})

// 获取文章列表
router.post('/getList', function (req, res, next) {
  let result = {
    code: null,
    msg: '',
    data: ''
  }
  Article.find({}, 'title abstract user createtime visited img', (err, docs)=>{
    result.code = 200
    result.msg = 'success'
    result.data = docs
    res.send(result)
  })
});

// 获取文章详情
router.post('/getArtDetail', function (req, res, next) {
  // console.log(req.body.id)
  let result = {
    code: null,
    msg: '',
    data: ''
  }
  Article.findOne({_id: req.body.id}, (err, docs) => {
    // console.log(docs)
    result.code = 200
    result.msg = 'success'
    result.data = docs
    res.send(result)
  })
});

// 评论
router.post('/discuss', function(req, res, next) {
  // 删除 $pull
  Article.update({ _id: req.body.articleId }, { $push: { comment: { comUser: req.body.comUser, userContent: req.body.userContent } } }, (err, raw) => {
    if (err) {
      res.send({
        code: '500',
        msg: '系统繁忙'
      })
    } else {
      if (raw.nModified === 0) {
        res.send({
          code: '500',
          msg: '评论失败'
        })
      } else {
        res.send({
          code: '200',
          msg: '评论成功'
        })
      }
    }
  })  
})

// 注册
router.post('/create', function(req, res, next) {
  let result = {
    code: null,
    msg: '',
    data: ''
  }
  console.log(req.body)
  Article.create(req.body, (err, raw)=>{
    if (err) {
      result.code = 500
      result.msg = 'failure'
      result.data = '系统繁忙'
      res.send(result)
    } else {
      result.code = 200
      result.msg = 'success'
      result.data = '添加成功'
      res.send(result)
    }
  })
  // Article.update({ title: '第一篇文章' }, {$pull: { comment: { comUser: 'ff' }}},(err,raw)=>{
  //   // console.log(raw)
  //     // result.code = 200
  //     // result.msg = raw
  //     // res.send(result)
  // })
  // Article.create({
  //   title: '这是第二篇文章',
  //   content: '第二篇文大哥大哥大哥的大多数是的省',
  //   user: '叶孤城',
  //   img: '/image/12.jpg',
  //   visited: 22,
  //   abstract: '第二篇摘要',
  //   comment: [{comUser: '嘻嘻', userContent: '我嘻嘻是评论'},
  //     { comUser: '哈哈', userContent: '我哈哈是评论' }],
  //   tags: ['HTML'] }, (err, docs) =>{
  //   if(!err){
  //     result.code = 200
  //     result.msg = '添加成功'
  //     res.send(result)
  //   } else {
  //     result.code = 500
  //     result.msg = '添加成功'
  //     res.send(result)
  //   }
  // })
});

console.log(Date.now)
console.log(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString())

module.exports = router;
