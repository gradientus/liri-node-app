// pull in required modules
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var colors = require("colors");

//
// pull in user input
var action = process.argv[2].toUpperCase();
var info = process.argv.slice(3).join(" ");

//
// decide which function will be run based on user input
function doThis(action, info) {
  switch (action) {
    case "MOVIE-THIS":
      if (!info) {
        getMovie("Mr. Nobody");
      } else {
        getMovie(info);
      }
      break;

    case "CONCERT-THIS":
      if (!info) {
        getConcert("Ariana Grande");
      } else {
        getConcert(info);
      }
      break;

    case "SPOTIFY-THIS-SONG":
      getSong(info);
      break;

    case "DO-WHAT-IT-SAYS":
      getWhatever();
      break;

    default:
      console.log("Mistakes were made.  Try again.");
  }
}

//
//function for movie-this
function getMovie(info) {
  axios
    .get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${
        process.env.OMDB_ID
      }&t=${info}`
    )
    .then(function(response) {
      console.log(
        `\n\n      ----- MOVIE INFORMATION -----\n
      Movie: ${response.data.Title}\n
      Released: ${response.data.Year}\n
      Country: ${response.data.Country}\n
      Language: ${response.data.Language}\n
      Actors: ${response.data.Actors}\n
      ${response.data.Ratings[0].Source} Rating: ${
          response.data.Ratings[0].Value
        }\n
      ${response.data.Ratings[1].Source} Rating: ${
          response.data.Ratings[1].Value
        }\n
      Plot: ${response.data.Plot}\n
      -----------------------------\n`
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}

//
//function for concert-this
function getConcert(info) {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${info}/events?app_id=${
        process.env.BAND_ID
      }`
    )
    .then(function(response) {
      console.log(`\n\n      ----- CONCERT INFORMATION -----\n
      Artist: ${info}\n  
      Venue: ${response.data[0].venue.name}\n
      Location: ${
        response.data[0].venue.city
      }, ${response.data[0].venue.region}\n`);
      console.log(
        "      Performance Date: " +
          moment(response.data[0].datetime).format("MM/DD/YYYY") +
          " at " +
          moment(response.data[0].datetime).format("hh:mma")
      );
      console.log(`\n      -----------------------------\n`);
    })
    .catch(function(err) {
      console.log(err);
    });
}

//
//function for do-what-it-says
function getWhatever() {
  fs.readFile("random.txt", "utf8", function(data) {
    data = data.split(",");
    action = data[0].toUpperCase();
    info = data[1];
    doThis(action, info);
    console.log(data, action, info);
  });
}

//
//function for spotify-this-song
function getSong(info) {
  //console.log(action, info);
  var spotify = new Spotify(keys.spotify);
  spotify
    .search({ type: "track", query: info })
    .then(function(response) {
      console.log(response.tracks.items[0]);
    })
    .catch(function(err) {
      console.log(err);
    });
}

//
//run the function to decide what is needed
doThis(action, info);

//
//
//TODO: log everything to a log.txt file
//TODO: make getSong work
//TODO: test spotify-this-song in getWhatever
//TODO: prevent getWhatever function from running do-what-it-says
//TODO: handle err on dowhatever
//TODO: figure out what is wrong in dowhatever
