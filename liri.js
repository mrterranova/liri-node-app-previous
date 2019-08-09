require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

if (process.argv[2]==="concert-this")