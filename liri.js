require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var userCommand = process.argv[2];

var userInput = process.argv.slice(3).join(" ");

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

    case "do-what-it-says":
        doWhat();
        break;

    default:
        console.log("Sorry I didn't get that. Please enter one of the following: spotify-this-song, concert-this, movie-this, or do-what-it-says");
        console.log("==============================================================================================================")
}

function bandsAPI() {
    
    var concertUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"

    axios.get(concertUrl).then(function (err, response) {
    
        var date = response.data[0].datetime;
        var formatDate = moment(date).format('MM/DD/YYYY');
        
        console.log("====================================================================================================================================");
        console.log(userInput + "'s next concert is at " + response.data[0].venue.name);
        console.log("In " + response.data[0].venue.city + ", " + response.data[0].venue.region);
        console.log("On " + formatDate);
        console.log("====================================================================================================================================");
    });
}

function spotifyAPI() {

    if (userInput === undefined || userInput === "") {
        userInput = "The Sign";
    }

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: "track", query: userInput, limit: 1 }).then(function (response) {
        var songs = response.tracks.items[0];

        console.log("====================================================================================================================================");
        console.log("Artist(s): " + songs.artists[0].name);
        console.log("Song Name: " + songs.name);
        console.log("Preview Song: " + songs.preview_url);
        console.log("Album: " + songs.album.name);
        console.log("====================================================================================================================================");
    });
}

function movieAPI() {

    if (userInput === undefined || userInput === "") {
        userInput = "Mr. Nobody";
    }

    var movieQueryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    axios.get(movieQueryUrl).then(function (response) {
        
        console.log("====================================================================================================================================");
        console.log("Title: " + response.data.Title);
        console.log("Released: " + response.data.Released);
        console.log("Rated: " + response.data.Rated);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("====================================================================================================================================");
        }
    );
}

function doWhat() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }

        var spotify = new Spotify(keys.spotify);
        
        spotify.search({ type: "track", query: data, limit: 1 }).then(function (response) {
            var songs = response.tracks.items[0];
            console.log("====================================================================================================================================");
            console.log("Artist(s): " + songs.artists[0].name);
            console.log("Song Name: " + songs.name);
            console.log("Preview Song: " + songs.preview_url);
            console.log("Album: " + songs.album.name);
            console.log("====================================================================================================================================");
        });
    })
}



