let mongoose = require('mongoose')
let config = require('./config')

module.exports = ()=>{
  mongoose.connect(config.mongodb, { useNewUrlParser: true })
  let db = mongoose.connection
  db.on('error', () => {
    console.log('数据库连接失败')
  })

  db.once('open', () => {
    console.log('数据库连接成功')
  })
  return db
}