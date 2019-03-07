$("document").ready(function() {

   // INITIAL STARTING BUTTONS
    var topics = [
        "chuck norris",
        "andrew garfield",
        "conan o brian",
    ]

    
    //EXISTING BUTTONS
    for (var i = 0; i < topics.length; i++) {
        var button = "<button class='button'>" + topics[i] + "</button>";
        $("#buttons").append(button);
    }

   
    console.log("Initial start length of array " + topics.length);
    
    // MAKE NEW BUTTONS

    $("#buttonCreater").on("click", function() {

        var text = $("#newButton").val();
        console.log(text);

        topics.push(text);

        var tracker = topics.length;
        tracker--;
        console.log(topics);

        console.log("Array lenght when the text is added " + topics.length);

        console.log("New length when new text is added ; this returns its position  " + tracker);
        
        for (var j = tracker; j < topics.length; j++) {
            var newButton = "<button class='button'>" + topics[tracker] + "</button>";
            $("#buttons").append(newButton);
            console.log(newButton);
        }

        $("#newButton").val(" ");

    });


    

    //AJAX IS GOING HERE
    var search = prompt();

    var limit = 4;

    var APIKey = "iJg7SL7dckwMoOl3NPOeJ2Hy9pcDrpvw";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + APIKey + "&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (j = 0; j < limit; j++) {
            var imageUrl = response.data[j].images.original.url;
            $("#imageWrapper").append("<img id='img' src=" + imageUrl + ">");
            console.log(imageUrl);
            
        }
        
      });
});