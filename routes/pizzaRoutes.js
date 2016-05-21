var express = require('express');

var routes = function(Pizza){

	var pizzaRouter = express.Router();

	pizzaRouter.route('/')
		.post(function(req, res){
			var pizza = new Pizza(req.body);

			pizza.save();
			res.status(201).send(pizza);

		})
		.get(function(req,res){

			var query = {};

			if (req.query.number){
			query.number = req.query.number;
			}

			Pizza.find(query, function(err,pizzas){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(pizzas);			}
			});
		});

	pizzaRouter.use('/:pizzaId', function(req,res,next){
		Pizza.findById(req.params.pizzaId, function(err,pizza){
			if (err){
				res.status(500).send(err);
			} else if (pizza){
				req.pizza = pizza;
				next();		
			} else {
				res.status(404).send('Nope!');
			}
		});
	});
	pizzaRouter.route('/:pizzaId')
		.get(function(req,res){
			res.json(req.pizza);
		})
		.put(function(req,res){
			req.pizza.words = req.body.words;
			req.pizza.number = req.body.number;
			req.pizza.read = req.body.read;	
			req.pizza.save(function(err){
				if (err){
					res.status(500).send(err);
				} 	else {
				res.json(req.pizza);
				}
			});
		})
		.patch(function(req,res){
			if(req.body._id){
				delete req.body._id;
			};
			for(var p in req.body){
				req.pizza[p] = req.body[p];
			}
			req.pizza.save(function(err){
				if (err){
					res.status(500).send(err);
				} 	else {
				res.json(req.pizza);
				}
			});

		})
		.delete(function(req,res){
			req.pizza.remove(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.status(204).send('Removed');
				}
			});
		});
	return pizzaRouter;

};

module.exports = routes;
