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
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

const Article = mongoose.model("Article", ArticleSchema)
module.exports = Article;