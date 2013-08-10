//a vote has the name of the voting topic (need to find an id scheme)
//a voter (email address)
//a createdAt
var Vote = function(pollUri, voter, choice){
  this.pollUri          = pollUri;
  this.voter            = voter;
  this.choice           = choice;
  this.createdAt        = new Date();
}

module.exports = Vote;
