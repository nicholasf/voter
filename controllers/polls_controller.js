var db = require('../db');

exports.show = function(req, res){
  var pollId = req.params['pollId'];
  var poll = db.polls[pollId];

  res.render('polls/show', {poll: poll});
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
