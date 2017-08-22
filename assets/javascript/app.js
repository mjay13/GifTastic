$(document).ready(function() {
    console.log("ready");

    // * * Step One * *

    // var for an array of strings
    var topics = ["horses", "dogs", "big dogs", "funny dogs", "slow clap", "yay", "sad face", "pigs", "wet cats"];


    // use a loop that appends a button for each string in the array

    // on click of each button, 

    // 10 static gifs should appear

    // make stil gifs animate or back to still on click

    // display rating under each gif


  // make buttons for topics array
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
    function getGifs() {

        var buttonText = $(this).attr("data-name"); // grabbing the data name to search in giphy

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=664e05291b014c27933e028eb228c181&q=" + buttonText + "&limit=10&lang=en";

        // function for getting *gifs* from giphy
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
    }

  // function for animating and still gifs
    function swapGifs() {
        //console.log("I have been clicked!");

        var state = $("img").attr("data-state");

        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }


  // call makeButtons function to load the intial buttons from topics array
    makeButtons();

    // * * Step Two * *

    // from the form, store the input in an array

    // funtion that takes each topic in the array and remakes a button

    // the buttons should function like the buttons above


    $("#addButton").on("click", function(event) {
        event.preventDefault();

        var newGifButton = $("#searchbarInput").val().trim();

        topics.push(newGifButton);

        document.getElementById('searchbarInput').value = ''; // clears the searchbar after input is submitted to make a button

        makeButtons();

    });


  // listeners for click funtions
    $(document).on("click", ".clickMe", getGifs); // wait where is .clickMe

    $(document).on("click", "img", swapGifs); 

    //click to still and animate only working on first gif


  // document ready closing tag
});