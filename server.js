const express = require("express");
const cors = require("cors");
// const weather = require('./data/weather.json');
const superagent = require("superagent");
const app = express();

app.use(cors());

require("dotenv").config();
let PORT = process.env.PORT;
let WEATHER_BIT_KEY = process.env.WEATHER_API_KEY;
let MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get('/movies', function (req, res) {
  try {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}`;
    superagent.get(movieUrl).then((movieData) => {
      const arrOfMovies = movieData.body.results.map(
        (movieData) => new MovieDb(movieData)
      );
      res.send(arrOfMovies);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/weather', function (req, res) {
  try {
    console.log(req.query);
    const weatherBitURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    superagent.get(weatherBitURL).then((weatherBitData) => {
      const arrOfData = weatherBitData.body.data.map(
        (data) => new Forecast(data)
      );
      res.send(arrOfData);
    });
  } catch (error) {
    console.log(error);
  }
  // const arrOfData = weather.data.map(value=> new Forecast(value));
  // res.send(arrOfData);
});
class MovieDb {
  constructor(data) {
    this.title = data.original_title;
    this.overView = data.overview;
    this.vote_average = data.vote_average;
    this.vote_count = data.vote_count;
    this.poster_path = data.poster_path;
    this.popularity = data.popularity;
    this.release_date = data.release_date;
  }
}
class Forecast {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}
app.listen(PORT);
