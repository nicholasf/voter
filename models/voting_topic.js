require('sugar');

//a voting topic has a name
//a creator (email address)
//an expiry in minutes
//a list of choices:
//choices should hold the html for a radio box?

//note - this means that anyone who can access the URL of the
//topic can vote (easier than inviting people).

var votingTopic = function(name, creator, expires, choices){
  this.name       = name;
  this.creator    = creator;
  this.expires    = expires;
  this.choices    = choices;
  this.createdAt  = new Date();
  this.uri        = name.dasherize();
  console.log("Created votingTopic: ", this.uri);
}

module.exports = votingTopic;
