var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var pizzaModel = new Schema({
	words: {
		type: String
	},
	number: {
		type: Number
	},
	read: {
		type: Boolean, default: false
	}
});

module.exports = mongoose.model('Pizza', pizzaModel);