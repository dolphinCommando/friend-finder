function HTMLRoute(app, path) {
  this.app = app;
  this.path = path;

  this.app.get('/', function(req, res) {
    res.sendFile(this.path.join(__dirname, '../public/home.html'));
  });

  this.app.get('/survey', function(req, res) {
    res.sendFile(this.path.join(__dirname, '../public/survey.html'));
  });
}

module.exports = HTMLRoute;