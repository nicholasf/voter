var Poll = require('../models').Poll
  , eventer = require('../events').eventer;

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
  eventer.emit('poll', req.poll);
  res.render('polls/show', {poll: req.poll});
}
