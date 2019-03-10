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

    
    // MAKE NEW BUTTONS
    $("#buttonCreater").on("click", function() {


        var text = $("#newButton").val();

        topics.push(text);

        var tracker = topics.length;
        tracker--;

       
        
        for (var j = tracker; j < topics.length; j++) {
            var newButton = "<button class='button'>" + topics[tracker] + "</button>";
            $("#buttons").append(newButton);
        }

        $("#newButton").val(" ");

    });

       
    
    //BUTTONS PRODUCE GIPHS 

    $(document).on("click", ".button", function() {

        $("#imageWrapper").empty();


        
        var newLimit = $("#limit").val();
        console.log(newLimit);
        var text = this.innerHTML;

        return ajaxResponse(text,newLimit);

    });
    
// --------------------------------------------------------------------------------------------------      
    function ajaxResponse(searchText,newLimit) {
        //AJAX IS GOING HERE (MAYBE PUT THIS IN A FUNCTION THAT RETURNS WHAT I WANT)

        var search = searchText;

        var limit = newLimit;
 
        var APIKey = "iJg7SL7dckwMoOl3NPOeJ2Hy9pcDrpvw";
 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + APIKey + "&limit=" + limit;
 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            var gifArray =response.data;
            return getAjaxData(gifArray); 
        });
// -----------------------------------------------------------------------//
        function getAjaxData (gifArray) {
            var imageArray = [];

            for (var i = 0; i < gifArray.length; i++) {
                imageArray.push(gifArray[i]);
            }
            showGifs(imageArray);
            changeGifs(imageArray);
            
        }
        
    }

// --------------------------------------------------------------------------------------------    
    function showGifs(imageArray) {
        
        limit = 10;

        for (var j = 0; j < limit ; j++) {
            var divTag = $("<div class='contentWrapper'>");

            var rating =   imageArray[j].rating;
            
            var headTag = $("<h3>");
            
            headTag.html(rating);
            
            var imageUrl = imageArray[j].images.original_still.url;
            
            var imageTag = $("<img class='image'>");
            
            imageTag.attr("src", imageUrl);
            imageTag.attr('data-still', imageArray[j].images.fixed_height_still.url);
            imageTag.attr('data-animate', imageArray[j].images.fixed_height.url);
            imageTag.attr('data-state', 'still');
            
            divTag.prepend(headTag);
            
            divTag.append(imageTag);
            
            $("#imageWrapper").append(divTag);

            
 
        }
        //  WILL SWITCH OUT URL OF STILL IMAGE IS MOVIN ONE

        $('.image').on('click', function () {
            event.preventDefault();
            var state = $(this).attr('data-state');
    
            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
        });
    }

});
