// Ryan Holland
// 2/21/19
// CS290 Assignment 7

/********************* SETUP ****************************/

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9001);

/************* HELPER FUNCTIONS **************************/
const getQueryParams = function(req) {
  var params = [];
  for (var p in req.query) {
    params.push({'name': p, 'value': req.query[p]})
  }
  return params;
}

const getPostBody = function(req) {
  var params = [];
  for (var p in req.body) {
    params.push({'name': p, 'value': req.body[p]})
  }
  return params;
}

/**************** ROUTING *********************************/
app.get('/', function(req, res){
  var context = {};
  context.queryParams = getQueryParams(req);

  res.render('get', context);
});

app.post('/', function(req, res){
  console.log(req.body);
  var context = {};
  context.queryParams = getQueryParams(req);
  context.postBody = getPostBody(req);

console.log(context.postBody);
  res.render('post', context);
});

app.use(function(req, res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

/************************** RUN *************************/
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});