$(document).ready(function() {

    // Create array for existing buttons
    var topics = ["The Office", "Grey's Anatomy", "Seinfeld", "Friends", "Game of Thrones", "Stranger Things", "The Crown", "Peaky Blinders", "Breaking Bad", "The Bachelor", "Vanderpump Rules", "Shark Tank", "Master Chef"];

    // Function to display buttons in "options" section
    function displayButtons () {
        $("#options").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("show button");
            a.attr("id", "show-button");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#options").append(a);
        }

        // create function to call API when a button is clicked
        $("button").on("click", function() {
            $("#gifs-display").empty();
            console.log("button is clicked.");
            var query = $(this).attr("data-name");
            var apiKey = "6SgPxEwrrIFJNm8dMbejGmZz2cPT2Kt8";
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=10";
            
            console.log(query);
            console.log(queryURL);
        
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                console.log(results);

                //create for loop to add a card for each button        
                for (var i = 0; i < results.length; i++) {
        
                    // create GIF card and data variables
                    var card = $("<div>").addClass("card");
                    var rating = $("<p>").text("Rating: " + results[i].rating).addClass("card-text");
                    var gifImage = $("<img>");
        
                    // add GIF data to page
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.attr("class", "gif");

                    console.log(gifImage);
  
                    card.append(gifImage);
                    card.append(rating);
                    
        
                    $("#gifs-display").append(card);
  
                }

                // create function to pause and play GIF on click
                $(".gif").on("click", function () {
                    
                    var state = $(this).attr("data-state");
                    console.log(state);

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                        console.log(state)
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                        console.log(state);
                    }


                });
        
            });
        
        
        });
    };

    //create function to add input to array of tv shows
    $("#submit").on("click", function(event) {

        event.preventDefault();
    
        clear();

        var newShow = $("#tvShow-input").val().trim();
        console.log(newShow);

        topics.push(newShow);
        console.log(topics);

        displayButtons();

        // create function to clear out input upon submission
        function clear() {
            $("#tvShow-input").html();
        }
    });

    displayButtons ();
});