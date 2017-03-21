
var express = require('express'),
	bodyParser = require('body-parser');

var app = express();
var port = 3000;

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
	}, {
		id: 7,
		title: 'Try Yourself',
		content: ''
	}];


app.use(express.static('src/views'));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var contentRouter = require('./src/contents/content')(subjects);
var serviceRouter = require('./src/contents/services');
var tryRouter = require('./src/contents/tryyourself')(subjects);

app.use('/Content', contentRouter);
app.use('/Service', serviceRouter);
app.use('/try', tryRouter);

app.listen(port, function(err){
	console.log('It\'s working');
});