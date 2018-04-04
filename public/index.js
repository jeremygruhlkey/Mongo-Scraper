$(document).ready( ()=> {

        $("#scrape").on("click", (event) => {
            console.log("scrape pressed")
            $.ajax({
                url: "api/scrape",
                type: "GET"
            }).done( (result) => {
                console.log(result)
            })
        })





})