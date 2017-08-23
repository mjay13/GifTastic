$(document).ready(function() {
    console.log("ready");

    // var for an array of strings to make buttons
    var topics = ["horses", "dogs", "big dogs", "funny dogs", "slow clap", "yay", "sad face", "pigs", "wet cats"];

    // buttons for topics array
    function makeButtons() {

        $("#buttonsGoHere").empty();

        // use a loop that appends a button for each string in the array
        for (var i = 0; i < topics.length; i++) {
            // console.log(topics[i]);

            var a = $("<button>");
            a.addClass("clickMe btn btn-info");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttonsGoHere").append(a);
        }
    }

    // function to bring in gifs with the api 
    $(document.body).on("click", ".clickMe", function() {
        console.log("gif button has been clicked!");

        var buttonText = $(this).attr("data-name"); // grabbing the data name to search in giphy

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=664e05291b014c27933e028eb228c181&q=" + buttonText + "&limit=10&lang=en";

        // getting *gifs* from giphy!
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            //console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifsDiv = $("<div class='well well-sm makeMeFloat'>");

                var p = $("<p>").text("rating: " + results[i].rating);

                var gifsImages = $("<img class='img-rounded'>");

                gifsImages.attr("src", results[i].images.fixed_height_still.url);
                gifsImages.attr("data-still", results[i].images.fixed_height_still.url);
                gifsImages.attr("data-animate", results[i].images.fixed_height.url);
                gifsImages.attr("data-state", "still");

                gifsDiv.append(gifsImages);
                gifsDiv.append(p);

                $("#gifsAppear").prepend(gifsDiv);
            }
        });
    });

    // animating and still gifs
    $(document.body).on("click", "img", function() {

        console.log("gif has been clicked!");

        var state = $("img").attr("data-state");

        if (state == "still") { // issues here - only the first gif in the list funtions properly, the rest can start, but not go back to still
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    // call makeButtons function to load the intial buttons from topics array
    makeButtons();

    // makes new buttons from searchbar inputß   
    $("#addButton").on("click", function(event) {
        event.preventDefault();

        var newGifButton = $("#searchbarInput").val().trim();

        topics.push(newGifButton);

        document.getElementById('searchbarInput').value = ''; // clears the searchbar after input is submitted to make a button

        makeButtons();

    });

    // document ready closing tag
});