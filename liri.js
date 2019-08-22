require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
//var moment = require("moment");
//var Spotify = require("node-spotify-api");

var action = process.argv[2];
var info = process.argv[3];

// console.log(action, value, process.env.OMDB_ID);

switch (action) {
  case "movie-this":
    getMovie(info);
    break;

  case "concert-this":
    //getConcert(info);
    break;

  case "spotify-this-song":
    //getSong(info);
    break;

  case "do-what-it-says":
    //getWhatever(info);
    break;
}

//function for movie-this
function getMovie(info) {
  axios
    .get(
      "https://www.omdbapi.com/?i=tt3896198&apikey=" +
        process.env.OMDB_ID +
        "&t=" +
        info
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
      ${response.data.Ratings[1].Source}: ${response.data.Ratings[1].Value}`
      );
    });
}
//Bands In Town: https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0

//What is this?
// new Spotify(keys.spotify);
