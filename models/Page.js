let mongoose = require('mongoose')
let PageSchema = require('../schemas/PageSchema.js')
let Page = mongoose.model('page', PageSchema)

module.exports = Page