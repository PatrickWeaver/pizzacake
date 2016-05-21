var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/pcAPI');

var Pizza = require('./models/pizzaModel')

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

pizzaRouter = require('./Routes/pizzaRoutes')(Pizza);
app.use('/api/Pizza', pizzaRouter);


app.get('/', function(req,res){
	res.sendFile('./public/index.html');
});

app.listen(port, function(){
	console.log('Running on Port: ' + port);
})