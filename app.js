const express = require('express')
const app = express();
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
})

app.post("/city", function(req,res){
  var cityName = req.body.city;
  console.log(cityName);
  const query = cityName;
  const apiKey = "ef4edf79c9b5c3d1b32f0abba9c89578";
  const units = 'metric';
  const lang = 'kr';
 const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units+"&lang="+lang;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
      const weatherData = JSON.parse(data);  //To convert the data into JSON format
      console.log(weatherData);
      const temp = weatherData.main.temp
      //console.log(temp);
      const weatherDes = weatherData.weather[0].description
      //console.log(weatherDes);
      const icon = weatherData.weather[0].icon
      const imageURL =  "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.set("content-type","text/html");
      res.write('<h3> The weather is currently '+ weatherDes + "</h3>");
      res.write("<h1>The temperature in " +query+ " is: " + temp + " degrees Celcius. </h1>" );
      res.write("<img src="+imageURL+">");
      res.send()
    })
    // var obj = {
    //   name : "Harshita",
    //   favoriteSong: "MagicShop"
    // }
    // console.log(JSON.stringify(obj));  //It will compact the data in the JSON o/p format in one line
  })
  //res.send("Server is running");
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
