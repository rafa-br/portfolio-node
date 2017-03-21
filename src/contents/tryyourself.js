var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

	var db = mongoose.connect("mongodb://localhost/YourAPI");

var getTryRouter = function(subjects){
	
	var tryRouter = express.Router();	

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
								res.redirect('/try/list');
							}
						}
					);
				} else {
					res.send(404).send("Nothing found");
					res.redirect('/try/list');
				}
			});
		});
			
	var updateList = function(res, query){
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

	return tryRouter;

}

module.exports = getTryRouter;