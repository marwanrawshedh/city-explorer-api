'use strict'
require('dotenv').config();
let express = require('express');
let cors = require('cors');
let data = require('./data/weather.json');
let server = express();
server.use(cors());
let PORT = process.env.PORT
// http://localhost:3000/
server.get('/', (req, res) => {
    res.send('Hello from the home route')
    console.log("hi")
})
server.get('/weather', (req, res) => {
    let name = req.query.name;
    let weatherArr = [];
    let weather = data.find((item) => {
      if (name === item.city_name) {
        weatherArr = item.data.map((day) => {
          let newObj = new Forecast(day);
          return newObj;
        });
      }
    });
    res.send(weatherArr);
  });
  function Forecast(day) {
    (this.date = day.valid_date),
      (this.desc = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`);
  }
server.get('*', (req, res) => {
    res.status(404).send('Sorry, page not found');
})
server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})