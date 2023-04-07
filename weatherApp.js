const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/weatherApp.html")
})

app.post("/", function(req, res) {
    const apikey = "b6f0ccf06b4649cf66be86ca82eec322"
    const city = req.body.city

    const endpoint = "https://api.openweathermap.org/data/2.5/weather"
    var query = `?q=${city}&appid=${apikey}&units=metric`

    var url = endpoint + query

    https.get(url, function(response) {
        if (response.statusCode === 200) {
            response.on("data", function(data) {
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp
                const des = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

                res.write("<h1>Here is the result:</h1>")
   
                res.write(`<p>In ${city}, the temperature is now ${temp} degree celsius, with ${des}.</p>`);
                res.write(`<img src=${imgURL}>`);

                res.send()

            })
        }
    })
})

app.listen(3000, function() {
    console.log("Ther server is loading.")
})