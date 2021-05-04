const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const app = express();
 
app.use(cors());
 
require('dotenv').config();
let PORT = process.env.PORT;

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/weather', function (req, res) {
  const arrOfData = weather.data.map(value=> new Forecast(value));
  res.send(arrOfData);
});

class Forecast{
  constructor(data){
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}
app.listen(PORT);
