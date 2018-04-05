$(document).ready( ()=> {

        $("#scrape").on("click", (event) => {
            console.log("scrape pressed")
            $.ajax({
                url: "api/scrape",
                type: "POST"
            }).then( (result) => {
                console.log(result)
            })
        })
})