let fs = require("fs");
require("dotenv").config();
let keys = require("./keys.js");
//let spotify = new Spotify(keys.spotify);
let request = require('request');
let moment = require('moment');

switch (process.argv[2]) {
    case "concert-this":
            //creates a string from proceeding arguments for user
            let artist = process.argv.slice(3).join(" ")

            //default condition if user doesn't provide artist 
            if (artist ===""){
                artist = "Cardi B";
            }

            //code from homework
            var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        
            //request code and send results in one console.log format
            request(queryURL, function (error, response, body) {
                if (error) console.log(error);
                var result  =  JSON.parse(body)[0];
                console.log("\n-----------------------------------------------------------------\nInformation for "+artist+" provided below:\n_____________________________\n\nVenue name: " + result.venue.name + "\nVenue location: " + result.venue.city+ "\nDate of Event: " +  moment(result.datetime).format("MM/DD/YYYY")+"\n-----------------------------------------------------------------");
            });
            break;
    case "spotify-this-song":

        break;

    case "movie-this":
        //creates a string from proceeding arguments for user
        let movie = process.argv.slice(3).join(" ");
        
        //default condition if user doesn't provide movie
        if (movie ===""){
            movie = "Mr.Nobody";
        }

        //axios call on the movie
        var axios = require("axios");
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                //Information given back to the user in form of one console.log
                console.log("\n-----------------------------------------------------------------\nYour Movie Information provided below:\n_____________________________\n\nTitle of the movie:\t\t\t" + response.data.Title + "\nYear the movie came out:\t\t" + response.data.Year + "\nIMDB Rating of the movie:\t\t" + response.data.Rated + "\nRotten Tomatoes Rating of the movie:\t" + response.data.imdbRating + "\nCountry where the movie was produced:\t" + response.data.Country + "\nLanguage of the movie:\t\t\t" + response.data.Language + "\nPlot of the movie:\t\t\t" + response.data.Plot + "\nActors in the movie:\t\t\t" + response.data.Actors+"\n-----------------------------------------------------------------");
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
            break;
    case "do-what-it-says":
}