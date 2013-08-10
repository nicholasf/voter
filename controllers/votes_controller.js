var db      = require('../db');
var models  = require('../models');


exports.new = function(req, res){
  res.render('votes/new', {poll: req.poll});
}

exports.create = function(req, res){
  var voter   = req.body.voter;
  var choice  = req.body.choice;
  console.log(req.body, " <<<< ");
  var vote    = new models.Vote(req.poll.uri, voter, choice);
  req.poll.addVote(vote);
  console.log("vote added");
  res.render('votes/show', {vote: vote})
}

