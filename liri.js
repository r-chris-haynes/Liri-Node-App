require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// omdb part of app
var axios = require("axios");


