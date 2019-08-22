require("dotenv").config();

// Call on files/resources 
let fs = require("fs");
let keys = require("./keys");
let Spotify = require("node-spotify-api");
let request = require('request');
let moment = require('moment');
let axios = require("axios");

// Creates a string from proceeding arguments for user
let userInput = process.argv.slice(3).join(" ");

// Spotify keys
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// Switch case scenario: user must know the key words to use to access this assignment
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
        doWhatSays();
        break;
}

//api call on artist band locality and time
function bandsInTownCommand(artist){

            // default condition if no artist. Assign Cardi B
            if (artist === "") {
                artist = "Cardi B";
            }
    
            // code for bandsintown using bootcamp access code
            let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
            // request code and send results in one console.log format
            request(queryURL, function (error, response, body) {
                if (error) console.log(error);
                let result = JSON.parse(body)[0];
   	//how appears to user in console
               console.log("\n-----------------------------------------------------------------\nInformation for " + artist + " provided below:\n_____________________________\n\nVenue name:\t" + result.venue.name + "\nVenue location:\t" + result.venue.city + "\nDate of Event:\t" + moment(result.datetime).format("MM/DD/YYYY") + "\n-----------------------------------------------------------------");
            });
}

//pulls up information based on the song title
function spotifyCommand(trackName){
    // if no argument for track then assign Ace of Base, The Sign
    if (trackName === ""){
        trackName = "The Sign by Ace of Base";
    }

    // Find track through search, type track and produce 10 results
    spotify.search({ type: 'track', query: trackName, limit:10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        // print this in console for user's information
        console.log("\n-----------------------------------------------------------------\nInformation for track: " + trackName + " provided below:\n_____________________________\n");
        
        // because multiple records print following in a for loop
        for (var i = 0; i < data.tracks.items.length; i++ ) {
                let artist = data.tracks.items[i].album.artists[0].name
                let album =  data.tracks.items[i].album.name
                let songName =  data.tracks.items[i].name
                let preview = data.tracks.items[i].preview_url 
                console.log("Artist:\t\t\t" + artist + "\nAlbum:\t\t\t"+ album + "\nName of Song:\t\t" +songName+"\nPreview of Song:\t"+ preview+"\n_____________________________\n");
        }
        // print this for appearance sake 
        console.log("-----------------------------------------------------------------\n");
    })
}

function movieCommand(movie){

            //default condition if user doesn't provide movie
            if (movie === "") {
                movie = "Mr.Nobody";
            }
    
            //axios call on the movie
            axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
                function (response) {

             //Information given back to the user in form of one console.log
            console.log("\n-----------------------------------------------------------------\nYour Movie Information provided below:\n_____________________________\n\nTitle of the movie:\t\t\t" + response.data.Title + "\nYear the movie came out:\t\t" + response.data.Year + "\nIMDB Rating of the movie:\t\t" + response.data.Rated + "\nRotten Tomatoes Rating of the movie:\t" + response.data.imdbRating + "\nCountry where the movie was produced:\t" + response.data.Country + "\nLanguage of the movie:\t\t\t" + response.data.Language + "\nPlot of the movie:\t\t\t" + response.data.Plot + "\nActors in the movie:\t\t\t" + response.data.Actors + "\n-----------------------------------------------------------------");
            })
                .catch(function (error) {
                    if (error.response) {

                        // The request was made and the server responded with a status code
                        console.log("---------------Data---------------");
                        console.log(error.response.data);
                        console.log("---------------Status---------------");
                        console.log(error.response.status);
                        console.log("---------------Status---------------");
                        console.log(error.response.headers);
                    } else if (error.request) {

                        // The request was made but no response was received
                        console.log(error.request);
                    } else {

                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });
}

function doWhatSays(){
    // Read file random.txt. If there is an error, skip. If there isn't return data in string and separate string so can perform multiple functions.
    fs.readFile('random.txt', 'utf8', function(error, random) {
        if (error) {
        } else {
            //part of BONUS
            let randomArr = [];
            randomArr = random.split(',');

            // wrap through entire array
            for (let i =0; i <randomArr.length; i++){
            
            //if statements to send out to specific functions
            if (randomArr[i] === 'concert-this'){
                randomArr[i+1].split("\"")
                bandsInTownCommand(randomArr[i+1]);
            }
            if (randomArr[i] === 'spotify-this-song') {
                spotifyCommand(randomArr[i+1]);
            }
            if (randomArr[i] === 'movie-this') {
                movieCommand(randomArr[i+1]);
            }
        }
    }
    });
}
