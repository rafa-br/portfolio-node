
var express = require('express'),
	bodyParser = require('body-parser');

var app = express();
var port = 80;

app.use(express.static('src/views'));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var contentRouter = require('./src/contents/content');
var serviceRouter = require('./src/contents/services');
var tryRouter = require('./src/contents/tryyourself');

app.use('/Content', contentRouter);
app.use('/Service', serviceRouter);
app.use('/try', tryRouter);

app.listen(port, function(err){
	console.log('It\'s working');
});