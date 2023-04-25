const request = require("request");

const geocoding = (city, callback) => {
  const place = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiZWtvbWliIiwiYSI6ImNsZzhseHlldjBncTIzbXQzMDFwYjdkb2gifQ.Q1pBInn5Vf0T56JYtNdiFQ&limit=1`;

  request({ url: place, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Invalid input details", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = { geocoding: geocoding };

// const url = `http://api.weatherstack.com/current?access_key=f81b1b0d610be5e51772819484082876&query=37.8267,-122.4233&units=m`;
// request({ url: url, json: true }, (error, response) => {
/*
  // json set to true is already parsing the response. So the response is now an object
  const data = JSON.parse(response.body);
  console.log(data.current);
  */
// console.log(response);
//   if (error) {
//     console.log("Unable to connect to the waeather app");
//   } else if (response.body.error) {
//     console.log("Invalid login details");
//   } else {
//     console.log(
//       `It is cuurently ${response.body.current.temperature} degrees out. It is partly ${response.body.current.weather_descriptions}`
//     );
//   }
// });

// const geocoding = `https://api.mapbox.com/geocoding/v5/mapbox.places/.json?access_token=pk.eyJ1IjoiZWtvbWliIiwiYSI6ImNsZzhseHlldjBncTIzbXQzMDFwYjdkb2gifQ.Q1pBInn5Vf0T56JYtNdiFQ&limit=1`;

// request({ url: geocoding, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather");
//   } else if (response.body.features.length === 0) {
//     console.log("Invalid input details");
//   } else {
//     console.log(`Longitude:${response.body.features[0].center[0]}`);
//     console.log(`Latitude:${response.body.features[0].center[1]}`);
//   }
// });
