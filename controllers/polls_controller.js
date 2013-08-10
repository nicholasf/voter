var Poll = require('../models').Poll
  , eventer = require('../events').eventer;

/** Middlewares **/
var getPoll = exports.getPoll = function(req, res, next){
  var pollId = req.params.pollId;
  Poll.find(pollId, function(err, poll){
    req.poll = poll;
    next();
  });
}

var getPolls = exports.getPolls = function(req, res, next){
  Poll.all(function(err, polls){
    req.polls = polls;
    next();
  });
}

var createPoll = exports.createPoll = function(req, res, next){
  var choices = req.body.choices.map( function(choice, val) {
    return {text: choice, value: val};
  });

  var poll = new Poll(req.body.name, req.body.creator, req.body.expiresIn, choices);
  poll.save();
  next();
};

var deletePoll = exports.deletePoll = function(req, res, next) {
  req.poll.delete();
  next();
};

/** Actions **/
exports.show = function(req, res){
  eventer.emit('poll', req.poll);
  res.render('polls/show', {poll: req.poll});
}

exports.list = function(req, res) {
  res.render('polls/index', {polls: req.polls})
};

exports.delete = function(req, res) {
  res.json({success: true});
};

exports.listJSON = function(req, res) {
  res.json(req.polls);
}