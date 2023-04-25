const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f81b1b0d610be5e51772819484082876&query=${lat},${long}&units=m`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect weather app", undefined);
    } else if (response.body.error) {
      callback("Invalid input details", undefined);
    } else {
      callback(undefined, {
        temperature: response.body.current.temperature,
        weather_desc: response.body.current.weather_descriptions,
      });
    }
  });
};

module.exports = { forecast: forecast };
