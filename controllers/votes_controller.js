var db      = require('../db');
var models  = require('../models');


exports.new = function(req, res){
  res.render('votes/new', {poll: req.poll});
}

exports.create = function(req, res){
  var voter   = req.body.voter;
  var choice  = req.body.choice;
  var vote;
  var error;
  if(req.poll) {
    vote = new models.Vote(req.poll.uri, voter, choice);
    req.poll.addVote(vote);
  }
  else {
    error = 'question expired';
  }
  
  res.render('votes/show', {vote: vote, error: error});
}

