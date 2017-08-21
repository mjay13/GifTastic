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
var topics = [horses, dogs, big + dogs, slow + clap];

// make buttons for topics array

//use a loop that appends a button for each string in the array

// on click of each button, 
	
	// 10 static gifs should appear
	
	// make stil gifs animate or back to still on click

	// display rating under each gif


	function makeButtons() {
		//remove comment wbelow
        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons").empty();


        // use a loop that appends a button for each string in the array
        for (var i = topics.length - 1; i >= 0; i--) { // or var i = 0; i < topics.length; i++
          console.log(topics[i]);
          $("#buttons").append("<button>" + topics[i] + "</button>");
        }
    }



// * * Step Two * *

// from the form, store the input in an array

// funtion that takes each topic in the array and remakes a button

	// the buttons should function like the buttons above

	// This function handles events where the addButton button is clicked
      $("#addButton").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // Write code to grab the text the user types into the input field
        var newButton = $("#searchbar-input").val().trim();

        // Write code to add the new searchbar-input into the movies array
        newButton.push(movie);

        // The renderButtons function is called, rendering the list of movie buttons
        makeButtons();
      });

      // Calling the renderButtons function to display the initial list of movies
      makeButtons();



// document ready closing tag
});

