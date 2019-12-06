const mysql = require('mysql');
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.API_KEY
});


const app = express();
const port = process.env.PORT;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('html', require('ejs').renderFile);
app.use(express.static('views'));


const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});


app.post('/form_search', function(req, res) {
  var radius = 1;
  var input_address = req.body['address'];
  googleMapsClient.geocode({
    address: input_address
  }, function(err, response) {
    if (!err) {

      var lat = response.json.results[0].geometry.location.lat;
      var lng = response.json.results[0].geometry.location.lng;

      // haversine formula
      var q = `SELECT *, ( 3959 * acos( cos( radians('${lat}') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('${lng}') ) + sin( radians('${lat}') ) * sin( radians( lat ) ) ) ) AS distance FROM pollingplaces HAVING distance < '${radius}' ORDER BY distance`;
      
      con.query(q, function (err, result, fields) {
          if (err) throw err;
          res.render('results.html', {res: result, loc: input_address, lat: lat, lng: lng});

        });

    }

  });
});

app.get('/about', (req, res) => {
  const about_page_para_1 = "We’re a group of students many of whom live have lived in PG county and we’ve heard the residents pain points about needing a fast and reliable way to find their assigned and closest polling placing!";
  const about_page_para_2 = "This application uses data provided by PG county to deliver the right experience to the PG county voter. We aim to help PG county voters plan a head by quickly locating thier polling places, make their election day a breeze.";

  res.render('about.html', {about_1: about_page_para_1, about_2: about_page_para_2});
})

app.get('/doc', (req, res) => {
  res.render('docs.html');
});

app.put('/put', (req, res) => {
  console.log("This is a put endpoint");
  res.redirect('/404');
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


