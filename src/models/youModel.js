var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var youModel = new Schema({
	name: {type:String},
	phone: {type:String},	
	email: {type:String},
	genre: {type:Number} //Male or Female.
});

module.exports = mongoose.model('You', youModel);