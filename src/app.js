const path = require("path");
const express = require("express");
const hbs = require("hbs");
const foreCast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

console.log(__filename);
console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

// heroku port
const port = process.env.PORT || 7000;

// Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ekom Ibiok",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ekom Ibiok",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ekom Ibiok",
    helpText: "Some Helpful text",
  });
});

app.get("/Weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Must provide an address",
    });
  } else {
    geoCode.geocoding(req.query.address, (error, geodatum = {}) => {
      if (error) {
        return res.send({
          Error: error,
        });
      } else if (geodatum) {
        // console.log(`Longitude: ${response.longitude}`);
        // console.log(`Longitude: ${response.latitude}`);
        foreCast.forecast(
          geodatum.latitude,
          geodatum.longitude,
          (error, response) => {
            const { temperature, weather_desc } = response;
            if (error) {
              res.send({
                Error: error,
              });
            } else if (response) {
              res.send({
                Forecast: `It is curently ${temperature} degrees out in ${geodatum.location}. It is partly ${weather_desc}`,
                location: geodatum.location,
                AddressRequested: req.query.address,
              });
            }
          }
        );
      }
    });
  }
  // if (!req.query.address) {
  //   return res.send({
  //     error: "You must provide an address",
  //   });
  // }

  // res.send({
  //   forecast: "Partly Cloudy",
  //   location: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    Text: "Help article not found",
    name: "Ekom Ibiok",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    Text: "Page not found",
    name: "Ekom Ibiok",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*

Not neccessary anymore since we are using the path core module to serve up our HTML 




app.get("", (req, res) => {
  res.send("Hello Express!!");
});

app.get("/help", (req, res) => {
  res.send("Help");
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});

*/
