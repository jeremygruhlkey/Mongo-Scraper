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

    $(".delete").on("click", function(event){
        const id = $(this).attr("data-id")
        console.log("delete clicked");
        $.ajax("/api/deleteArticle/" + id, {
            type: "DELETE"
        }).then( () => {
            console.log("article deleted");
            location.reload();
        })
    })

    $(".notes").on("click", function(event){
        const id = $(this).attr("data-id");
        console.log(id)
        $(".modal-" + id).modal("show");
        console.log("notes clicked");
    })

    $(".save-note").on("click", function(event){
        const id = $(this).attr("id");
        const body = $(".note-" + id).val().trim();
        const note = {
            body: body
        }

        $.ajax({
            url: "/api/addnote/" + id,
            method: "POST",
            data: note
        }).done( function(res){

            })
            $(".modal").modal("hide")
            $(".note-" + id).val("");
        })
        
})
