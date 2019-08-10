require("dotenv").config();

let fs = require("fs");
let keys = require("./keys");
let Spotify = require("node-spotify-api");

//creates a string from proceeding arguments for user
let userInput = process.argv.slice(3).join(" ");

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});


let request = require('request');
let moment = require('moment');

//switch case scenario in which user has 
switch (process.argv[2]) {
    case "concert-this":
        bandsInTownCommand(userInput);
        break;
    case "spotify-this-song":
        spotifyCommand(userInput);
        break;

    case "movie-this":
        movieCommand(userInput);
        break;
    case "do-what-it-says":
        console.log("do what it says");
        doWhatSays();
        break;
}

function bandsInTownCommand(artist){

            //default condition if user doesn't provide artist 
            if (artist === "") {
                artist = "Cardi B";
            }
    
            //code from homework
            let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
            //request code and send results in one console.log format
            request(queryURL, function (error, response, body) {
                if (error) console.log(error);
                let result = JSON.parse(body)[0];
               console.log("\n-----------------------------------------------------------------\nInformation for " + artist + " provided below:\n_____________________________\n\nVenue name:\t" + result.venue.name + "\nVenue location:\t" + result.venue.city + "\nDate of Event:\t" + moment(result.datetime).format("MM/DD/YYYY") + "\n-----------------------------------------------------------------");
            });
}

function spotifyCommand(trackName){

    if (trackName === ""){
        trackName = "the sign by Ace of Base";
    }

    spotify.search({ type: 'track', query: trackName, limit:10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\n-----------------------------------------------------------------\nInformation for track: " + trackName + " provided below:\n_____________________________\n");
        for (var i = 0; i < data.tracks.items.length; i++ ) {
                let artist = data.tracks.items[i].album.artists[0].name
                let album =  data.tracks.items[i].album.name
                let songName =  data.tracks.items[i].name
                let preview = data.tracks.items[i].preview_url 
                console.log("Artist:\t\t\t" + artist + "\nAlbum:\t\t\t"+ album + "\nName of Song:\t\t" +songName+"\nPreview of Song:\t"+ preview+"\n_____________________________\n");
        }
                console.log("-----------------------------------------------------------------\n");
    })
}

function movieCommand(movie){

            //default condition if user doesn't provide movie
            if (movie === "") {
                movie = "Mr.Nobody";
            }
    
            //axios call on the movie
            var axios = require("axios");
            axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    //Information given back to the user in form of one console.log
                    console.log("\n-----------------------------------------------------------------\nYour Movie Information provided below:\n_____________________________\n\nTitle of the movie:\t\t\t" + response.data.Title + "\nYear the movie came out:\t\t" + response.data.Year + "\nIMDB Rating of the movie:\t\t" + response.data.Rated + "\nRotten Tomatoes Rating of the movie:\t" + response.data.imdbRating + "\nCountry where the movie was produced:\t" + response.data.Country + "\nLanguage of the movie:\t\t\t" + response.data.Language + "\nPlot of the movie:\t\t\t" + response.data.Plot + "\nActors in the movie:\t\t\t" + response.data.Actors + "\n-----------------------------------------------------------------");
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
}

function doWhatSays(){
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
        } else {
            let dataArr = [];
            dataArr = data.split(',');
            for (let i =0; i <dataArr.length; i++){

            if (dataArr[i] === 'concert-this'){
                dataArr[i+1].split("\"")
                bandsInTownCommand(dataArr[i+1]);
            }
            if (dataArr[i] === 'spotify-this-song') {
                spotifyCommand(dataArr[i+1]);
            }
            if (dataArr[i] === 'movie-this') {
                movieCommand(dataArr[i+1]);
            }
        }
    }
    });
}
