const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    summary: {
        type: String,
    }
})

const Article = mongoose.model("Article", ArticleSchema)
module.exports = Article;