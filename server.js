const express = require("express");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser")

const app = express();

const db = require("./models");

// const databaseURL = "headlines";
// const collections = ["articles", "notes"];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/Onion-Scraper")

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", (req,res) => {
    request("https://www.theonion.com/", (error, response, html) => {
        const $ = cheerio.load(html);
        let results = [];

        $("article.postlist__item").each( (i, element) => {
            const title = $(element).find("h1").find("a").text();
            const link = $(element).find("h1").find("a").attr("href");
            const summary = $(element).find(".excerpt").find("p").text();
            const image = $(element).find("picture").find("source").attr("data-srcset");

            results.push({
                title:title,
                link:link,
                summary:summary,
                image:image
            });
            
        })

        const allTheArticles = {
            articles: results
        };
        // console.log(results);
        console.log(allTheArticles)
        res.render("index", allTheArticles);
    })
  
})

app.get("/saved", (req, res) => {
    db.Article.find({})
        .then( (dbSaved) => {
            savedArticles = {
                saved: dbSaved
            }
            res.render("saved", savedArticles)
        })
})
app.post("/api/newSaved/", (req, res) => {
    console.log(req.body);
    db.Article.create(
        {
            title: req.body.postTitle,
            image: req.body.postImage,
            link: req.body.postLink,
            summary: req.body.postSummary
        }
    ).then( (result) => {
        res.json(result)
    }).catch(err => {
        console.log(err)
    })
})

app.delete("/api/deleteArticle/:id", (req, res) => {
    console.log(req.params.id)
    db.Article.deleteOne({
        _id: req.params.id
    }).then((result) => {
        res.json(result)
    }).catch(err => {
        console.log(err)
    })
})

app.post("/api/addnote/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    db.Note.create({
        body: req.body.body
    }).then((dbNote) => {
        return db.Article.findOneAndUpdate({id: req.params.id}, {$push: {notes: dbNote._id} }, {new: true} )
    }).then((dbNote) => {
        
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000!!")
})