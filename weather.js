
let axios = require('axios')
let Forecastweather=require('./Forcastweather')
function gettingweather(req, res) {
  let name = req.query.name;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${process.env.WEATHER_API_KEY}`;
  axios
  .get(url)
    .then(arr => {

      let newday = arr.data.data.map(item => {
        return new Forecastweather(item);
      })

      res.send(newday)
    })
    .catch(err => console.log(err))

  
};

module.exports = gettingweather