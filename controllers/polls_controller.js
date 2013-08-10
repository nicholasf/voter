var db = require('../db');

/** Middlewares **/
var getPoll = exports.getPoll = function(req, res, next){
  var pollId = req.params['pollId'];
  var poll = db.polls[pollId];
  req.poll = poll;
  next();
}

/** Actions **/
exports.show = function(req, res){
  res.render('polls/show', {poll: req.poll});
}
