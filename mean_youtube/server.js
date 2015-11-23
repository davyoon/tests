var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var methodOverride = require('method-override');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('meetup.db');
var meetupsController = require('./server/controllers/meetups-controller');

app.use('/js', express.static(__dirname + '/client/js'));

app.use(bodyParser());
app.use(methodOverride('_method'));


app.get('/', function(req, res){
	res.sendfile(__dirname + '/client/views/index.html');
});


app.get('/api/meetups', function(req, res){
	db.all('SELECT * FROM users', function(err, users){
		if(err){
			throw err;
		}
		res.json(users);
	})
})


app.post('/api/meetups', function(req, res){
	var user = req.body.name;
	console.log(user);
	db.run('INSERT INTO users (name, password) VALUES (?, ?)', user, "12345", function(err){
		if(err){
			throw err;
		};
	});	
	res.json()
});


app.listen(3000, function(){
	console.log("I'm liistening...");
});