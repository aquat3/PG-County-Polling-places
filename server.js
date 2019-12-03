const mysql = require('mysql');
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAi8_G0qcijemU6clSZAML_9lvUQSnz-q4'
});

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('html', require('ejs').renderFile);
app.use(express.static('views'));


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ma0811504HER",
  database: "polling_data"
});




app.post('/form_search', function(req, res) {
  console.log(req.body['address']);
  // var lat;
  // var lng;

  var radius = 1;

    googleMapsClient.geocode({
      address: req.body['address']
    }, function(err, response) {
      if (!err) {

        var lat = response.json.results[0].geometry.location.lat;
        var lng = response.json.results[0].geometry.location.lng;

        var q = `SELECT *, ( 3959 * acos( cos( radians('${lat}') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('${lng}') ) + sin( radians('${lat}') ) * sin( radians( lat ) ) ) ) AS distance FROM pollingplaces HAVING distance < '${radius}' ORDER BY distance`;
        
        con.query(q, function (err, result, fields) {
            if (err) throw err;

            return res.render('results.html',result);
              // for (const row in result) {
              //   console.log(result[row].ADDRESS);
              // }

          });

      }

    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


