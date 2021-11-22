var express = require('express');
var app = express();

//Set Pug as the templating engine for the app
app.set('view engine', 'pug');
app.set('views','./views');

//Used to parse the body of requests which have payloads attached to them
var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())

//Parses Cookie header and populate req.cookies with an object keyed by cookie names
var cookieParser = require('cookie-parser');
app.use(cookieParser())

//Simple middleware function example.  
//Can be restricted to a specific route by providing the route as the first argument of app.use()
app.use(function(req, res, next){
   console.log("A new request received at " + Date.now());
   
   //This function call is very important. It tells that more processing is
   //required for the current request and is in the next middleware
   //function route handler.
   next();
});

//Example of serving static files
app.use(express.static('public'));


//Routes below
app.get('/first_template', function(req, res){
   res.render('first_view');
});

app.get('/static_file_test', function(req, res){
   res.render('staticfiletest');
});

app.get('/dynamic', function(req, res){
   res.render('dynamic', {
      name: "TutorialsPoint", 
      url:"http://www.tutorialspoint.com"
   });
});

app.get('/dynamic2', function(req, res){
   res.render('dynamic2', {
      user: {name: "Ayush", age: "20"}
   });
});

app.get('/components', function(req, res){
   res.render('content');
});

//example of routes being maintained in a separate file
var things = require('./things.js');
app.use('/things', things);

app.get('/hello', function(req, res){
   res.send("Hello World!");
});
 
app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});

app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route!");
});

//example of a dynamic route
app.get('/:id', function(req, res) {
   res.send('The id you specified is ' + req.params.id);
});

//Other routes here.  This replaces the standard 404 "Cannot GET whatever" message
//This should go after all your routes
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);