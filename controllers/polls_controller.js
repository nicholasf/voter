var Poll = require('../models').Poll;

/** Middlewares **/
var getPoll = exports.getPoll = function(req, res, next){
  var pollId = req.params[0] || req.params.pollId;
  console.log('ID:', pollId);
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
  poll.save(true);
  next();
};

var deletePoll = exports.deletePoll = function(req, res, next) {
  if(!req.poll) return next();
  req.poll.delete();
  next();
};

/** Actions **/
exports.show = function(req, res){
  res.render('polls/show', {poll: req.poll});
}

exports.showJSON = function(req, res){
  res.json(req.poll);
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