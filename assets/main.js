var peopleArray = ["Harvey Specter", "Jordan Belfort", "Elon Musk", "Bill Gates", "Nick Miller", "Bill Clinton"]

function displayButtons(){
    $("#button-display").empty()
    for (var i = 0; i < peopleArray.length; i++) {
        var newButton = $("<button>")
        newButton.text(peopleArray[i])
        newButton.addClass("btn btn-primary btn-lg")
        newButton.attr("info", peopleArray[i])
        newButton.attr("id", "btn")
        $("#button-display").append(newButton)
    }
}
displayButtons()

$(document).on("click", ".btn", function () {
    var info = $(this).attr("info")
    $.get("https://api.giphy.com/v1/gifs/search?q=" + info + "&api_key=UcptY1YYMiXVusEvBHjDciFSik2zVKAy&limit=10").then(function (response) { 
        $("#gif-display").empty()     
        for (var i = 0; i < response.data.length; i++) {
            var urlAnimated = response.data[i].images.fixed_height.url
            var urlStill = response.data[i].images.fixed_height_still.url
            var rating = response.data[i].rating
            console.log(response.data[i])
            var newGiphy = $("<img>")
            newGiphy.attr("src", urlStill)
            newGiphy.attr("giphy-still", urlStill)
            newGiphy.attr("giphy-animated", urlAnimated)
            newGiphy.attr("data-state", "still")
            newGiphy.addClass("giphy")
            $("#gif-display").append(newGiphy)
            $("#gif-display").append(rating)
            
        }
    })
})

$(document).on("click", ".giphy", function () {
    
    var giphyAnimated = $(this).attr("giphy-animated")
    var giphyStill = $(this).attr("giphy-still")
    var dataState = $(this).attr("data-state")

       if(dataState == "still") {
            $(this).attr("src", giphyAnimated)
            $(this).attr("data-state", "animated") 

       } else if(dataState== "animated") {
            $(this).attr("src", giphyStill) 
            $(this).attr("data-state", "still") 
            }
})

$(document).on("click", "#button-add", function () {
    var text= $("#input-text").val().trim()
    peopleArray.push(text) 
    displayButtons()
    $("#input-text").val("")

})


