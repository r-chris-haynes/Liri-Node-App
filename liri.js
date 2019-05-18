require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
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

function bandsAPI() {
    var concertUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"

    axios.get(concertUrl).then(
        
        function (err, response) {
           
            var date = response.data[0].datetime;
            var formatDate = moment(date).format('MM/DD/YYYY'); 
            
            console.log("====================================================================================================================================");
            console.log(userInput +"'s next concert is at " + response.data[0].venue.name);
            console.log("In " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("On " + formatDate);
            console.log("====================================================================================================================================");
            
        }
    );
}

function spotifyAPI() {

    var spotify = new Spotify(keys.spotify);
    
    // console.log(spotify)

    spotify.search({ type: "track", query: userInput, limit: 1}).then(function(response) {
        console.log(response.tracks.items);
        console.log("====================================================================================================================================");
         
        
        console.log("====================================================================================================================================");
    
    
    })
           
    }






function defaultMovie() {
    var defaultMovieUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";

    axios.get(defaultMovieUrl).then(function (response) {

            console.log("====================================================================================================================================");
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

    axios.get(movieQueryUrl).then(function (err, response) {

            if (userInput === "" || err) {
                defaultMovie()
            } else {
                console.log("====================================================================================================================================");
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




