let mongoose = require('mongoose')
let Schema = mongoose.Schema
let pageSchema = new Schema({
  textHeader: String,
  textContent: String,
  textfooter: String,
  indexImg: String
})

module.exports = pageSchema