'use strict'
require('dotenv').config();
let express = require('express');
let cors = require('cors');
// let data = require('./data/weather.json');
let server = express();
let axios = require('axios')
server.use(cors());
let PORT = process.env.PORT
// http://localhost:3010/
server.get('/weather', (req, res) => {
  let name = req.query.name;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${process.env.WEATHER_API_KEY}`;
  let getting = async () => {
    try {
      let arr = await axios.get(url)

      let newday = arr.data.data.map(item => {
        return new Forecast(item);
      })
      // console.log(newday)
      
    }
    catch {err => console.log(err) }
  }
  getting()
  function Forecast(day) { 
    this.date = day.valid_date,
      this.desc = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
  }
});

server.get('/movies', (req, res) => {
  let name = req.query.name;
  let urlmovies = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.MOVIE_API_KEY}`;
  let gettingmovies = async () => {
    try {
      let arrmovies = await axios.get(urlmovies)

      let newmovie = arrmovies.data.results.map(item => {
        return new Forecast(item);
      })
      res.send(newmovie)

    }
    catch { err => console.log(err) }
  }
  gettingmovies()
  function Forecast(day) { 
    this.title = day.original_title,
      this.overview = day.overview,
      this.average_votes=day.vote_average,
      this.total_votes=day.vote_count,
      this.popularity=day.popularity,
      this.released_on=day.release_date;
  }
});
server.get('*', (req, res) => {
  res.status(404).send('Sorry, page not found');
})
server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
})