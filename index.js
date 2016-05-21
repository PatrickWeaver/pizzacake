var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req,res){
	res.send('<html><head>' +
			'<title>🍕🍰</title>' +
			'<style>#pc { font-size: 300px; text-align: center; margin-top: 10%;} #pc::after {content: \"🍕🍰\"; font-size: 300px; display: block;}</style>' +
			'</head>'+
			'<body><div id=\'pc\'></div></body></html>')
});

app.listen(port, function(){
	console.log('Running on Port: ' + port);
})