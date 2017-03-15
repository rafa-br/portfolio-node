var express = require("express");

var contentRouter = express.Router();

var subjects = [{
		id: 1,
		title: 'Home',
		content: 'Here I tell my history about, bla bla bla'
	},{
		id: 2,
		title: 'Experience',
		content: ['My Experience comes here', 
				  'My Experience comes here', 
				  'My Experience comes here', 
				  'My Experience comes here']
	},{
		id: 3,
		title: 'Skills',
		content: 'My skills are listed here'
	},{
		id: 4,
		title: 'Personal Data',
		content: 'My Personal data is presented here'
	},{
		id: 5,
		title: 'Certificates/Courses',
		content: 'My certificates are here'
	},{
		id: 6,
		title: 'About',
		content: 'This site was built using...boot, node, mongodb...'
	}];

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

module.exports = contentRouter;

