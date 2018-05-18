var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var html = require('./app/routing/htmlRoutes.js');
var apiRoutes = require('./app/routing/apiRoutes.js');

html.homeRoute(app, path)
html.surveyRoute(app, path);

apiRoutes.getFriends(app);
apiRoutes.postFriends(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});