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
    let weather = data.find(item => {
        if (name === item.city_name) {
            return item.city_name
        }
    })
    let arr = [{
        city: weather.city_name,
        lat: weather.lat,
        lon: weather.lon,
        day1: {weather:weather.data[0].weather.description,time: weather.data[0].datetime},
        day2: {weather:weather.data[1].weather.description,time: weather.data[1].datetime},
        day3: {weather:weather.data[2].weather.description,time: weather.data[2].datetime},
    }]
    res.send(arr)
})
server.get('*', (req, res) => {
    res.status(404).send('Sorry, page not found');
})
server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})