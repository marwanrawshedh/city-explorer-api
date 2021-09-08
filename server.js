'use strict'
require('dotenv').config();
let express = require('express');
let cors = require('cors');
// let data = require('./data/weather.json');
let server = express();
let axios = require('axios')
let gettingweather=require('./weather')
let gettingmovies=require('./movies')
server.use(cors());
let PORT = process.env.PORT

// http://localhost:3010/weather
server.get('/weather', gettingweather)
// http://localhost:3010/movies
server.get('/movies', gettingmovies)

server.get('*', (req, res) => {
  res.status(404).send('Sorry, page not found');
})
server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
})