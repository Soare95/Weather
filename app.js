
const express = require("express");....
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  var cityName = req.body.cityName;

  const city = cityName;
  const apiKey = "YOUR API KEY";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const parsedData = JSON.parse(data);
      const temp = parsedData.main.temp;
      const weatherDescription = parsedData.weather[0].description;
      const icon = parsedData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The weather description is " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius</h1>");
      res.write("<img src=" + iconUrl + ">");
      res.send();

    })
  })
})


app.listen(3000, function() {
  console.log("Server running on port 3000");
})
