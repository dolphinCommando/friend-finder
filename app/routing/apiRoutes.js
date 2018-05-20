var friends = require('../data/friends.js');

exports.getFriends = function(app) {
  app.get('/api/friends', function(req, res) {
    return res.json(friends);
  });  
}

exports.postFriends = function(app) {
  app.post('/api/friends', function(req, res) {
    var myself = req.body;
    var newFriend = matchFriends(friends, myself);
    friends.push(myself)
    
    res.send(newFriend);
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



