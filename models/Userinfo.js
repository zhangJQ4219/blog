let mongoose = require('mongoose')
let UserinfoSchema = require('../schemas/UserinfoSchema.js')
let Userinfo = mongoose.model('userinfo', UserinfoSchema)

module.exports = Userinfo