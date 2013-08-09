var db = require('../db');

exports.show = function(req, res){
  var votingTopicId = req.params['votingTopicId'];
  var votingTopic = db.votingTopics[votingTopicId];

  res.render('voting_topics/show', {votingTopic: votingTopic});
}

// exports.new = function(req, res){
// //  res.render('index', { title: 'Voter' });
// }

// exports.create = function(req, res){
// //  res.render('index', { title: 'Voter' });

// }

// exports.index = function(req, res){
// //  res.render('index', { title: 'Voter' });
// }
