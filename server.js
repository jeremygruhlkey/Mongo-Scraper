const express = require("express");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser")

const app = express();

const databaseURL = "headlines";
const collections = ["posts"];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

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

app.listen(3000, () => {
    console.log("Listening on port 3000!!")
})