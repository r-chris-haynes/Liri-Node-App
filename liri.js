require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var userCommand = process.argv[2];
// console.log(userCommand);

var userInput = process.argv.slice(3).join(" ");
// console.log(userInput);


//switch statement to see which api call to make//
switch (userCommand) {

    case "concert-this":
        bandsAPI();
        break;

    case "spotify-this-song":
        spotifyAPI();
        break;

    case "movie-this":
        movieAPI();
        break;

    default:
        console.log("Please enter one of the following commands, spotify-this-song, concert-this, movie-this, or do-what-it-says");
        console.log("==============================================================================================================")
}

// function concertAPI() {


// }





function defaultMovie() {
    var defaultMovieUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy"; 

    axios.get(defaultMovieUrl).then(
        function (response) {
            
           
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Released);
            console.log("Rated: " + response.data.Rated);
            // console.log("Rotten Tomatoes Rating: " + response.data.Ratings.Source.Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("====================================================================================================================================");
        
            
            
        
        }
       
    );

}



function movieAPI() {

    var movieQueryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    axios.get(movieQueryUrl).then(
        function (response) {
            
            if (userInput ==="") {
                defaultMovie()
            }  else {
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Released);
            console.log("Rated: " + response.data.Rated);
            // console.log("Rotten Tomatoes Rating: " + response.data.Ratings.Source.Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("====================================================================================================================================");
        
            
            }
        
        }
       
    );
}




