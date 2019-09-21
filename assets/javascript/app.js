$(".gif").on("click", function() {
    console.log("click");
});

var characters = ["michael", "pam", "jim"];


function displayButtons () {
    $("#options").empty();

    for (var i = 0; i < characters.length; i++) {
        var a = $("<button>");
          a.addClass("movie");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", characters[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(characters[i]);
          // Adding the button to the HTML
          $("#options").append(a);
    }
};

$("#submit").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    // Empty the region associated with the articles
    clear();
  
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQuery();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });

  function buildQuery() {
    var query = $("#character-input").val().trim();
    var apiKey = "6SgPxEwrrIFJNm8dMbejGmZz2cPT2Kt8";
    // queryURL is the url we'll use to query the API
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=5";
    
    // Logging the URL so we have access to it for troubleshooting
    console.log(queryURL);
  }

displayButtons ();