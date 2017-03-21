var express = require("express");

var getContentRouter = function(subjects){
	
	var contentRouter = express.Router();

	contentRouter.route('/')
		.get(function(req, res){
			res.render('index', {item: subjects[0]});
		}
	);

	contentRouter.route('/:id')
		.get(function(req, res){
			var id = req.params.id;
			res.render('index', {item: subjects[id-1]});
		}
	);

	contentRouter.route('/list/:id')
		.get(function(req, res){
			var id = req.params.id;
			res.render('listContent', {item: subjects[id-1]});
		}
	);

	return contentRouter;
}	
	
module.exports = getContentRouter;

