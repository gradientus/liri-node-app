// pull in required modules
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

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
      //getSong(info);
      break;

    case "DO-WHAT-IT-SAYS":
      getWhatever();
      break;

    default:
      console.log("Mistakes were made.");
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
        `\n----- MOVIE INFORMATION -----\n
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
      Plot: ${response.data.Plot}`
      );
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
      console.log(`\n----- CONCERT INFORMATION -----\n
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
    });
}

//
//function for do-what-it-says
function getWhatever() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(`Something went wrong: ${err}.`);
    }
    data = data.split(",");
    action = data[0];
    info = data[1];
    doThis(action, info);
    console.log(data, action, info);
  });
  //TODO: test concert-this
  //TODO: test movie-this
  //TODO: test spotify-this-song
  //TODO: prevent this function from running do-what-it-says
}

//
//function for spotify-this-song
function getSong(info) {}

//
//run the function to decide what is needed
doThis(action, info);

//
//TODO: log everything to a log.txt file
//TODO: format the output to be a little nicer for the log.txt
//TODO: put in fail-safe mechanisms to prevent users from pluggin in garbage
//TODO: put in a way to handle errors that come back to the promise
//TODO: make getSong work
//QUESTION: should I combine the axios part of both of these functions? and let the function be the console.log bit?
//QUESTION: I look back to examples and assignments, I don't think I can do that in an interview.  What should I generally have memorized?
//QUESTION: Why would I ever make an app like this?  The professor says it's to build a webserver, but I'm not sure I understood the explanation.
//QUESTION:  Not entirely sure how I understand the Spotify and keys.js .  Why is Spotify a constructor?  Because of the key.js being an object that is being imported?  Why would I do that and not jut do what I did above with the .env IDs?
