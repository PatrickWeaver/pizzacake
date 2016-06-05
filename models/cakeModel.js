var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var cakeModel = new Schema({
	caption: {
		type: String
	},
	url: {
		type: String
	},
	readCount: {
		type: Number, default: 0
	}
});

module.exports = mongoose.model('Cake', cakeModel);