var Poll = require('../models').Poll;

/** Middlewares **/
var getPoll = exports.getPoll = function(req, res, next){
  var pollId = req.params['pollId'];
  Poll.find(pollId, function(err, poll){
    req.poll = poll;
    next();
  });
}

/** Actions **/
exports.show = function(req, res){
  res.render('polls/show', {poll: req.poll});
}
