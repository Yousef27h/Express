const superagent = require("superagent");

require('dotenv').config();
let WEATHER_BIT_KEY = process.env.WEATHER_API_KEY;

function weatherFun(req, res) {
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
}

class Forecast {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = weatherFun;
