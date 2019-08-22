require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
//var Spotify = require("node-spotify-api");

var action = process.argv[2].toUpperCase();
var info = process.argv[3].toUpperCase();

console.log(action, info);

switch (action) {
  case "MOVIE-THIS":
    if (info == null) {
      getMovie("Mr. Nobody");
    } else {
      getMovie(info);
    }
    break;

  case "CONCERT-THIS":
    getConcert(info);
    break;

  case "SPOTIFY-THIS-SONG":
    //getSong(info);
    break;

  case "DO-WHAT-IT-SAYS":
    //getWhatever(info);
    break;
}

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
      ${response.data.Ratings[0].Source}: ${response.data.Ratings[0].Value}\n
      ${response.data.Ratings[1].Source}: ${response.data.Ratings[1].Value}\n
      Plot: ${response.data.Plot}`
      );
    });
}

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
