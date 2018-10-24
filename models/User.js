let mongoose = require('mongoose')
let UserSchema = require('../schemas/UserSchema.js')
let User = mongoose.model('user', UserSchema)

module.exports = User