var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	
var tryRouter = express.Router();	
var db = mongoose.connect("mongodb://localhost/YourAPI");

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
	},{
		id: 7,
		title: 'Try Yourself'
	}];

var You = require("../models/youModel");

tryRouter.route('/new')
	.post(function(req, res){
		console.log("Body: " + req.body);
		var you = new You(req.body);
		
		you.save(
			function (err) {
				if (err){ 
					console.log(err);
				} else {
					res.redirect('/try/list');
				}	
			});
	});

tryRouter.route('/update')
	.post(function(req, res){
		You.findById(req.body.old_id, function (err, you) {
		  
		  if (err) 
			  return handleError(err);		  
			
			you.name = req.body.name;
			you.email = req.body.email;
			you.genre = req.body.genre;
			you.phone = req.body.phone;
			
		    you.save(
				function (err) {
					if (err){ 
						console.log(err);
					} else {
						res.redirect('/try/list');
					}	
				});
		});
	});

	
tryRouter.route('/list')
	.get(function(req, res){
		updateList(res, {});
	});	
	
tryRouter.route('/update/:id')
	.get(function(req, res){
		console.log(req.params.id);
		You.find({"_id": req.params.id}, function(err, list){
		if(err){
			console.log(err);
		} else {
			res.render('insertForm', {you:list[0], method:'update', item:subjects[6]});
		}
	});
});
	
tryRouter.route('/delete/:id')
	.get(function(req, res){
		You.findById(req.params.id, function(err, you){
			if(err){
				console.log(err);
			} else if(you){
				you.remove(					
					function(err){
						if(err){
							res.status(500).send(err);
						} else {
							updateList(res, {});
						}
					}
				);
			} else {
				res.send(404).send("Nothing found");
				updateList(res, {});
			}
		});
	});
		
var updateList = function(res, query){
	console.log("function updateList");
	You.find(query, function(err, list){
		if(err){
			console.log(err);
		} else {
			res.render('yourList', {they: list, item:subjects[6]});	
		}
	});
}
	

tryRouter.route('/')
	.get(function(req, res){
		res.render('insertForm', {you:{}, method:'new', item:subjects[6]});
	}
);

module.exports = tryRouter;