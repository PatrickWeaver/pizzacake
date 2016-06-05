var express = require('express');

var routes = function(Cake){

	var cakeRouter = express.Router();

	cakeRouter.route('/')
		.post(function(req, res){
			var cake = new Cake(req.body);

			cake.save();
			res.status(201).send(cake);
		})
		.get(function(req,res){

			var query = {};

			if (req.query.hashtag){
			query.hashtag = req.query.hashtag;
			}

			Cake.find(query, function(err,cakes){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(cakes);			}
			});
		});

	cakeRouter.use('/:cakeId', function(req,res,next){
		Cake.findById(req.params.cakeId, function(err,cake){
			if (err){
				res.status(500).send(err);
			} else if (cake){
				req.cake = cake;
				next();		
			} else {
				res.status(404).send('Nope!');
			}
		});
	});
	cakeRouter.route('/:cakeId')
		.get(function(req,res){
			res.json(req.cake);
		})
		.put(function(req,res){
			req.cake.caption = req.body.caption;
			req.cake.url = req.body.url;
			req.cake.readCount = req.body.readCount;	
			req.cake.save(function(err){
				if (err){
					res.status(500).send(err);
				} 	else {
				res.json(req.cake);
				}
			});
		})
		.patch(function(req,res){
			if(req.body._id){
				delete req.body._id;
			};
			for(var p in req.body){
				req.cake[p] = req.body[p];
			}
			req.cake.save(function(err){
				if (err){
					res.status(500).send(err);
				} 	else {
				res.json(req.cake);
				}
			});

		})
		.delete(function(req,res){
			req.cake.remove(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.status(204).send('Removed');
				}
			});
		});
	return cakeRouter;

};

module.exports = routes;
