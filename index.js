var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db;


if (process.env.ENV == 'staging' ){
	db = mongoose.connect(process.env.MONGODB_URI);
} else if (process.env.ENV == 'production' ){
	db = mongoose.connect(process.env.MONGODB_URI);
} else {
	db = mongoose.connect('mongodb://localhost/pcAPI');
}

var Pizza = require('./models/pizzaModel');
var Cake = require('./models/cakeModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

pizzaRouter = require('./routes/pizzaRoutes')(Pizza);
app.use('/api/Pizza', pizzaRouter);
cakeRouter = require('./routes/cakeRoutes')(Cake);
app.use('/api/Cake', cakeRouter);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
	res.sendFile(__dirname + '/templates/index.html');
});
app.get('/pizza/new', function(req,res){
	res.sendFile(__dirname + '/templates/newPizza.html');
});
app.get('/cake/new', function(req,res){
	res.sendFile(__dirname + '/templates/newCake.html');
});

app.listen(port, function(){
	console.log('Running on Port: ' + port);
})