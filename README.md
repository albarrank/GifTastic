# GifTastic

# This web app goes into giphy's server and returns values set by the parameters of the user.

#This helps test you the use of AJAX and the API key.
for (j = 0; j < limit; j++) {
                 var divTag = $("<div class='contentWrapper'>");
 
                 var rating = response.data[j].rating;
                 console.log(rating);
 
                 var headTag = $("<h3>");
                 headTag.html(rating);
                 console.log(headTag);
 
                 // $("#imageWrapper").append("<h3 class='rating'>" + rating + "</h3>");
 
                 // NEED TO ADD ==> movingGif = response.data[j].images.orignal.url
 
                 var imageUrl = response.data[j].images.original_still.url;
                 var imageTag = $("<img>");
                 imageTag.attr("src", imageUrl);
                 console.log(imageTag);
 
                 divTag.prepend(headTag);
                 divTag.append(imageTag);
 
                 $("#imageWrapper").append(divTag);
 
                 // $("#imageWrapper").append("<img class='img' src=" + imageUrl + ">");
                 console.log(imageUrl);
                 
             }