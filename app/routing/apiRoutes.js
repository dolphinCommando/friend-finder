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
        var myself = req.body;
        var newFriend = matchFriends(friends, myself);
        friends.push(myself)
        fs.writeFile(fd, JSON.stringify(friends), (err) => {
          if (err) throw err;
        });
        res.send(newFriend);
      });
    })
  });
}

function matchFriends(friends, myself) {
  var compareArr = [];
  for (var j = 0; j < friends.length; j ++) {
    compareArr.push(0);
    for (var i = 0; i < myself.scores.length; i++) {
      compareArr[j] += Math.abs(+myself.scores[i] - +friends[j].scores[i]);   
    }
  }
  var minIdx = 0;
  for (var k = 0; k < compareArr.length; k++) {
    if (compareArr[k] < compareArr[minIdx]) {
      minIdx = k;
    }
  }
  return friends[minIdx];
}
/*
function displayModal(friend) {
  $('#modal-name').text(friend.name);
  $('#modal-img').attr('src', friend.photo);
  $('#myModal').modal();
}
*/


