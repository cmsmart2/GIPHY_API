var parksRecArray = ["Leslie Knope", "Ron Swanson", "April Ludgate","Andy Dwyer","Jerry Gergich", "Tom Haverfor", "Donna Meagle", "Pawnee", "Eagleton","Lil Sebastian", "Tammy II","Perd Hapley" ];
var newSearch ="";

// loads buttons on screen when page is loaded
startPage();
// the function for the startPage 
function startPage (){
    myButtons();
}
//creates the buttons at the top of the page
function myButtons (){
    $('#buttons-here').empty();
    for (var i=0; i<parksRecArray.length; i++){
        var button = $('<button>');
        button.attr('data-type', parksRecArray[i]);
        button.addClass('btn btn-secondary m-2 pageButtons');
        button.text(parksRecArray[i]);
        $('#buttons-here').append(button);
    }
}
//Allows user to add new buttons
$('#submit-button').on('click',function(){
    event.preventDefault();
    newSearch = $('#input-here').val().trim();
    parksRecArray.push(newSearch)
    myButtons();
    $("#input-here").empty();
    
});
//Gets the data from giphy when a button at the top is clicked and prints gifs & rating on the page
$('.pageButtons').on('click', function(){
    $('#gifs-here').empty();
    var search = $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    search + "&api_key=JDtfMAG5dL64fEDgFBtAb7sPmUp5naHP&limit=10&rating=pg";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var imageDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var gifImage = $("<img>");
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            gifImage.attr("src", still);
            gifImage.attr("data-still", still);
            gifImage.attr("data-animated", animated);
            gifImage.attr("data-state", 'still');
            gifImage.addClass('gifImages')
            imageDiv.append(p);
            imageDiv.append(gifImage);
            $("#gifs-here").prepend(imageDiv);
        }
    });
});
// animates and stills the gifs
$(document).on('click', '.gifImages', function() {
    var state = $(this).attr('data-state');
    if (state === 'still') {
      $(this).attr("src", $(this).data("animated"));
      $(this).attr("data-state", "animated");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
  });
