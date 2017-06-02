const express = require('express')
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Test CSD</h1>')
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

app.listen(8080, function() {
  console.log('Node app is running on port', app.get('port'));
});
