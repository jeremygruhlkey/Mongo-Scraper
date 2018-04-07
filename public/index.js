$(document).ready( ()=> {

    $(".save").on("click", function(event){
        const postStuffForSaved = {
            postImage: $(this).attr("data-image"),
            postTitle: $(this).attr("data-title"),
            postLink: $(this).attr("data-link"),
            postSummary: $(this).attr("data-summary")
        }
        console.log(postStuffForSaved);
        $.ajax("/api/newSaved/", {
            type: "POST",
            data: postStuffForSaved
        }).done( () => {
            console.log("You saved and Article")
            alert("You saved an article. Go to Saved Articles to view and comment.")
        })
    })
})
