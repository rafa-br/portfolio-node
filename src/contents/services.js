var express = require('express');
	
var serviceRouter = express.Router();

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


serviceRouter.route('/')
	.get(function(req, res){
		var responseJson = {response: subjects};
		res.json(responseJson);
	});

serviceRouter.route('/:id')
	.get(function(req, res){
		var id = req.params.id;
		var responseJson = {response: subjects[id-1]};
		res.json(responseJson);
	});
	
module.exports = serviceRouter;

