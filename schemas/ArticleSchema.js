let mongoose = require('mongoose')
let Schema = mongoose.Schema
let time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
let articleSchema = new Schema({
  title: String,
  content: String,
  user_id: String,
  user: {
    type:String,
    default: '张三'
  },
  createtime:{
    type: String,
    default: time
  },
  // 图片
  img: String,
  // 访问量
  visited: {
    type: Number,
    default: 0
  },
  // 摘要
  abstract: String,
  // 评论
  comment: [{
    comUser: String,
    userContent: String,
    comTime: {
      type: String,
      default: time
    }
  }],
  // 标签
  tags: Array
})

module.exports = articleSchema