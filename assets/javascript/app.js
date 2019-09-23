$(document).ready(function() {

    var tvShows = ["The Office", "Grey's Anatomy", "Seinfeld", "Friends", "Game of Thrones", "Stranger Things", "The Crown", "Peaky Blinders"];



    function displayButtons () {
        $("#options").empty();

        for (var i = 0; i < tvShows.length; i++) {
            var a = $("<button>");
            a.addClass("show");
            a.attr("id", "show-button");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-name", tvShows[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(tvShows[i]);
            // Adding the button to the HTML
            $("#options").append(a);
        }

        $("button").on("click", function() {
            console.log("button is clicked.");
            var query = $(this).attr("data-name");
            var apiKey = "6SgPxEwrrIFJNm8dMbejGmZz2cPT2Kt8";
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=5";
            
            console.log(query);
            console.log(queryURL);
        
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                console.log(results);
        
                for (var i = 0; i < results.length; i++) {
        
                    // create GIF card and data variables
                    var cardDiv = $("<div>");
                    var rating = $("<p>").text("Rating: " + results[i].rating)
                    var gifImage = $("<img>");
        
                    // add GIF data to page
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.attr("class", "gif");

                    console.log(gifImage);
  
                    
                    cardDiv.append(rating);
                    cardDiv.append(gifImage);
        
                    $("#gifs-display").prepend(gifImage);
  
                }

                $(".gif").on("click", function () {
                    var state = $(this).attr("data-state");
                    console.log(state);

                    if (state = "still") {
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

    $("#submit").on("click", function(event) {
        // This line allows us to take advantage of the HTML "submit" property
        // This way we can hit enter on the keyboard and it registers the search
        // (in addition to clicks). Prevents the page from reloading on form submit.
        event.preventDefault();
    
        // Empty the region associated with the articles
        clear();

        var newShow = $("#tvShow-input").val().trim();
        console.log(newShow);

        tvShows.push(newShow);
        console.log(tvShows);

        // calling renderButtons which handles the processing of our movie array
        displayButtons();

        function clear() {
            $("#tvShow-input").html();
        }
    });

    displayButtons ();
});