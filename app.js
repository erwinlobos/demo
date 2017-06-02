const express = require('express')
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const app = express()
const port = process.env.PORT || 80;

app.get('/', function (req, res) {
  res.send('<h1>Demo</h1>')
})

app.get('/clima/:ciudad?', function (req, res) {
  geocode.geocodeAddress(req.params.ciudad, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(results.address);
      weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {          
          var resp = {
            ciudad : results.address,
            latitud : results.latitude,
            longitud : results.longitude,
            temperatura : weatherResults.temperature,
            sensacionTermina : weatherResults.apparentTemperature
          }          
          res.send(resp)
        }
      });
    }
  });
})

app.listen(port, function() {
  console.log('App ejecutandose en puerto '+port);
});
