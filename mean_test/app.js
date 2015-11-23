var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var request = require('request');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testing.db');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(express.static('public'));

app.use(cookieParser());
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(session({ secret: 'hello',
									resave: false,
									saveUninitialized: false
								}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(function(name, password, done){
	console.log("IN HERE " + name)
	db.all('SELECT * FROM users WHERE name=?', name, function(err, table){
		if(table[0].name === name && table[0].password === password){
			done(null, {user: table});
		}else{
			done(null, false);
		}
	});
}));

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});

app.post('/login', passport.authenticate('local', {
	failureRedirect: '/accessfailed',
	successRedirect: '/users'
}));

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

var loginCheck = function(req, res){
	if(req.session.passport.user === undefined){
		console.log('NOT LOGGED IN');
		res.redirect('/');
	}
}

app.get('/', function(req, res){
	res.render('index.ejs', {title: "home"});
})

app.get('/users', function(req, res){
	loginCheck(req, res);
	var user = req.user.user[0];
	res.render('main.ejs', {user: user});
})

// app.get('/:name', function(req, res){
// 	// var name = req.params.name;
// 	var name = db.users.find();
// 	res.send(name + " was here");
// });

//_______________________________CREATE USER____________________________

app.post('/create', function(req, res){
	var name = req.body.name;
	var password = req.body.password;
	console.log(name);
	console.log(password);

	db.run('INSERT INTO users (name, password) VALUES (?, ?)', name, password, function(err){
		if(err){
			throw err;
		}
	})
	// var user =
	res.redirect('/');
})






// app.post('/users', function(req, res){
// 	var name = req.body.name;
// 	var password = req.body.password;
// 	console.log(name);
// 	console.log(password);

// 	db.all('SELECT * FROM users WHERE name=?', name, function(err, rows){
// 		if(err){
// 			throw err;
// 		}else{
// 			if(rows[0] && rows[0].password === password){
// 				res.render('main.ejs', {user: rows[0]});
// 			}else{
// 				res.redirect('/');
// 			}
// 		}
// 	});

// })

app.listen(3000, function(){
	console.log('listening on port 3000')
})





















// var http = require('http');
// var myServer = http.createServer(function(request, response){
// 	response.writeHead(200, {"Content-type" : "text/html"});
// 	response.write("hello");
// 	response.end();
// });

// myServer.listen(3000);