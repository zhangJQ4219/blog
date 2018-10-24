let mongoose = require('mongoose')
let ArticleSchema = require('../schemas/ArticleSchema.js')
let Article = mongoose.model('article', ArticleSchema)

module.exports = Article