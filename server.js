const express = require("express");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");

const app = express();

const databaseURL = "headlines";
const collections = ["posts"];

request("https://www.theonion.com/", (error, response, html) => {
    const $ = cheerio.load(html);
    let results = [];

    $("article.postlist__item").each( (i, element) => {
        const title = $(element).find("h1").find("a").text();
        const link = $(element).find("h1").find("a").attr("href");

        results.push({
            title:title,
            link:link});
        
    })
    console.log(results);
})

app.listen(3000, () => {
    console.log("Listening on port 3000!!")
})