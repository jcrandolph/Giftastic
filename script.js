$(document).ready(function () {
    console.log("test")
    //array of buttons to-be
    let starWarsArray = ["han solo", "luke skywalker", "lightsaber", "yoda", "obi-wan kenobi", "r2-d2",
        "death star", "jar-jar binks", "chewbacca", "imperial walker", "boba fett", "pod racer"];
           
        //function with for loop to render the buttons from the array
    function renderButtons() {
        $("#buttonsDiv").empty();
        for (let i = 0; i < starWarsArray.length; i++) {
            let starBtn = $("<button>");
            starBtn.addClass("arrayBtn btn btn-primary");
            starBtn.attr("data-name", starWarsArray[i]);
            starBtn.text(starWarsArray[i]);
            $("#buttonsDiv").append(starBtn);
        }
    }
    
    //when clicking from list of buttons, make ajax call to get the gifs and display in div
    $('#buttonsDiv').on("click", ".arrayBtn", function () {
        $("#gifDiv").empty();        
        let name = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            name + "&api_key=qZNgxxevvWKDup187rHDZLcSWULmbW0h&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                let results = response.data;
                for (let i = 0; i < results.length; i++) {
                    let gifs = $("<div>");
                    let p = $("<p>").text("Rating: " + results[i].rating);
                    let gifImg = $("<img>");
                    gifImg.attr("src", results[i].images.fixed_height.url);
                    gifs.append(p);
                    gifs.append(gifImg);
                    $("#gifDiv").prepend(gifs);
                };
            });
    });
        //click event for user to add new reference and render a new button
    $("#add-input").on("click", function (event) {
        event.preventDefault();
        let newInput = $("#user-input").val().trim();
        starWarsArray.push(newInput);
        console.log(starWarsArray);
        renderButtons();
    });
    renderButtons();
    //code to change gifs from animate to still and vice versa by click
    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});
