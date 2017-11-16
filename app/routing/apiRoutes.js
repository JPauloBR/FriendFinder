var friendsData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  function verComp(scores) {
    console.log(scores);
    var match = {};
    var matchIndex = 0;
    var sum = 0;
    for (var i=0; i<friendsData.length; i++) {
      var tempSum = 0;
      console.log("Friends: "+ friendsData[i].name);


      for (var j=0; j<friendsData[i].scores.length; j++) {
        var friendScore = parseInt(scores[j]);
        var matchScore = parseInt(friendsData[i].scores[j]);
        if (matchScore > friendScore) {
          tempSum += (matchScore - friendScore);
        } else {
          tempSum += (friendScore - matchScore);
        }
      }

      if (tempSum == 0) {
        matchIndex = i;
        break;
      }

      if (sum == 0 || sum > tempSum) {
        sum = tempSum;
        matchIndex = i;
      }
    }

    match.name = friendsData[matchIndex].name;
    match.photo = friendsData[matchIndex].photo;
    return match;
  }

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  app.post("/api/friends", function(req, res) {
    var userScoreArray = req.body["scores[]"];
    console.log("userScoreArray: "+ userScoreArray);

    //logic data for compatibility    

    var bestMatch = verComp(userScoreArray);

    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: userScoreArray
    }
    friendsData.push(newFriend);


    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.photo);
    console.log(userScoreArray);
    console.log("Best Match: " +bestMatch);

    // var scores = JSON.parse(req.body.scores);

    // for (var i = 0; i < Things.length; i++) {
    //   Things[i]
    // }

    res.send(bestMatch);
    res.json(true);  
  });

};
