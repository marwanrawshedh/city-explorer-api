
let axios = require('axios')
function gettingweather(req, res) {
  let name = req.query.name;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${process.env.WEATHER_API_KEY}`;
  axios
    .get(url)
    .then(arr => {

      let newday = arr.data.data.map(item => {
        return new Forecast(item);
      })
      res.send(newday)
    })

    .catch(err => console.log(err))


  function Forecast(day) {
    this.date = day.valid_date,
      this.desc = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
  }
};

module.exports=gettingweather