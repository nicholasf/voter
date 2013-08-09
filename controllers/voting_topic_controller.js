var db = require('../db');

exports.show = function(req, res){
  console.log('ok .... ', req.params);
  var votingTopicId = req.params['votingTopicId'];
  var votingTopic = db.votingTopics[votingTopicId];
  console.log('found it', votingTopic);
  console.log('the db: ', db);

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
