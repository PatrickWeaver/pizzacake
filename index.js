var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db;

if (process.env.ENV == 'staging' || 'production'){
	db = mongoose.connect(process.env.MONGODB_URI);
} else {
	db = mongoose.connect('mongodb://localhost/pcAPI');
}

var Pizza = require('./models/pizzaModel')

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

pizzaRouter = require('./routes/pizzaRoutes')(Pizza);
app.use('/api/Pizza', pizzaRouter);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function(){
	console.log('Running on Port: ' + port);
})