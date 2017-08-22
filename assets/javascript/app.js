// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.

// We chose animals for our theme, but you can make a list to your own liking.
// Your app should take the topics in this array and create buttons in your HTML.

// Try using a loop that appends a button for each string in the array.
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).

// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

$(document).ready(function() {
    console.log("ready");

    // * * Step One * *

    // var for an array of strings
    var topics = ["horses", "dogs", "big dogs", "funny dogs", "slow clap", "pigs"];


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
            // $("#buttonsGoHere").append("<button class='clickMe btn btn-info'>" + topics[i] + "</button>");
            // $("button").attr("data-name", topics[i]); // applying only the last data from the index to everyone?!?!?! this doesn't work
            var a = $("<button>");
            a.addClass("clickMe btn btn-info");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttonsGoHere").append(a);
        }
    }

    // on click event
    //$(".clickMe").on("click", function() {
    function getGifs() {   

        var buttonText = $(this).attr("data-name"); // grabbing this but where can i get * * * 

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=664e05291b014c27933e028eb228c181&q=" + buttonText + "&limit=10&lang=en";

        // function for getting *things* from giphy
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifsDiv = $("<div class='well well-sm makeMeFloat'>");

                var p = $("<p>").text("rating: " + results[i].rating);

                var gifsImages = $("<img class='goOrStop img-rounded'>");

                gifsImages.attr("src", results[i].images.fixed_height_still.url);
                gifsImages.attr("data-still", results[i].images.fixed_height_still.url);
                gifsImages.attr("data-animate", results[i].images.fixed_height.url);
                gifsImages.attr("data-state", "still");

                gifsDiv.append(p);
                gifsDiv.append(gifsImages);

                $("#gifsAppear").prepend(gifsDiv);
            }
        });
    }
 // get out of here
    $(".goOrStop").on("click", function() {

        var state = $("img").attr("data-state");

        console.log(state);

        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // call makeButtons function to load the intial buttons from topics array
    makeButtons();

    // * * Step Two * *

    // from the form, store the input in an array

    // funtion that takes each topic in the array and remakes a button

    // the buttons should function like the buttons above

    // $("#buttons").empty(); ??


    $("#addButton").on("click", function(event) {
        event.preventDefault();

        var newGifButton = $("#searchbarInput").val().trim();

        topics.push(newGifButton);

        makeButtons();

    });

$(document).on("click", ".clickMe", getGifs);

    // document ready closing tag
});