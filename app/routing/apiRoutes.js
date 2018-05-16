var fs = require('fs');

exports.getFriends = function(app) {
  app.get('/api/friends', function(req, res) {
    fs.readFile('./app/data/friends.js', (err, data) => {
      if (err) throw err;
      return res.json(JSON.parse(data));
    });
  });  
}

exports.postFriends = function(app) {
  fs.open('./app/data/friends.js', 'r+', (err, fd) => {
    if (err) throw err;
    fs.readFile(fd, (err, data) => {
      if (err) throw err; 
      var friends = JSON.parse(data);
      app.post('/api/friends', function(req, res) {
        var newFriend = req.body;
        friends.push(newFriend);
        fs.writeFile(fd, JSON.stringify(friends), (err) => {
          if (err) throw err;
        });
      });
    })
  });
}
