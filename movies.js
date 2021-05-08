const superagent = require("superagent");

require("dotenv").config();
let MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const inMemory = {};
function moviesFun(req, res) {
  try {
    const movieName = req.query.query;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movieName}`;
    superagent.get(movieUrl).then((movieData) => {
      if (inMemory[movieName] !== undefined) {
        // console.log("we got our data from memory!")
        res.send(inMemory[movieName]);
      } else {
        // console.log("Got data from API!")
        const arrOfMovies = movieData.body.results.map(
          (movieData) => new MovieDb(movieData)
        );
        inMemory[movieName] = arrOfMovies;
        res.send(arrOfMovies);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
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
module.exports = moviesFun;
