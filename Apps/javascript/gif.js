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
            divTag.prepend(headTag);
            divTag.append(imageTag);
            
            if (imageUrl !== imageArray[j].images.original_still.url) {
                imageUrl = imageArray[j].images.original_still.url;
                imageTag.attr("src", imageUrl);
            }
            else if (imageUrl !== imageArray[j].images.original.url) {
                imageUrl = imageArray[j].images.original.url;
                imageTag.attr("src", imageUrl);
            }

            $("#imageWrapper").append(divTag);

            
 
        }

    }

    //   THIS WAS ESSENTIALLY GOING TO CHANGE THE SOURCE VALUE OF THE IMAGE

    function changeGifs(imageArray) {
        var y = imageArray;
    /* HERE I WAS TRYING TO SET AN ARRAY OF THE ANIMATED IMAGE URL'S TO
        SEE IF IT DIDNT MATCH BY THE STILL ONE PERTAINING TO WHAT
        INDEX POSITION IT WAS IN */
        $(document).on("click", ".image", function() {
            limit = 1;
            compareArray = y;
            var urlArray =[];
            console.log(compareArray);
            for(k = 0; k < compareArray.length; k++) {
                urlArray.push(compareArray[k].images.original.url);
            }
            console.log(urlArray);
            thisImage = this;
            for(l = 0; l < urlArray.length; l++) {
                if ($(this).attr("src") !== urlArray[k]) {
                    console.log("hello");
                }
            }
            console.log(thisImage);            

        });

    }

    // function movingGif(animateGif) {
    //     console.log(animateGif);
    // }

    
    // function passArray(imageArray) {
    //     console.log(imageArray);
    // }
    

});




// var result = ('add', 4, 6);

// function calculator (operator, x, y) {
//     if(operator === 'add') {
//         var sum = add(x, y);
//         return sum;
//     }
// }

// function add (x, y) {
//     return x + y;
// }



/*
button click
    get response from ajax

getresponsfromAjax, async
    get response from API
        when response is received, response is an array of objects
            appendsImages(response)

appendsImages(response)
    parent div with id of images
    loop through response
        create image element
        append divs url from response to images
*/