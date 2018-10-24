let mongoose = require('mongoose')
let Schema = mongoose.Schema
let userinfoSchema = new Schema({
  user: String,
  avatorImg: String,
  name: String,
  profression: String,
  phone: Number,
  hobby: Array,
  swiper: Array
})

module.exports = userinfoSchema