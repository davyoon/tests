var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var bodyParser = require('body-parser');
var ejs = require('ejs');

app.set('view_engine', 'ejs');

var urlencoderBodyParser = bodyParser.urlencoded({extended: false});
app.use(urlencoderBodyParser);


var id = JSON.parse(fs.readFileSync("client_id.json", "utf8")).id;
var secret = JSON.parse(fs.readFileSync("client_secret.json", "utf8")).secret;


app.get('/', function(req, res) {

	request("https://api.foursquare.com/v2/venues/explore?client_id=" + id + "&client_secret=" + secret + "&ll=40.7593910,-73.7755910&section=food&limit=50&v=20140806&m=swarm", function(err, response, body){
		var data = JSON.parse(body);
		var restaurants = data.response.groups[0].items;
		console.log(restaurants)
		res.render("index.html.ejs", {restaurants: restaurants})

	});
});




console.log(id);
console.log(secret);

















app.listen(3000, function(){
	console.log("listening on port 3000")
})