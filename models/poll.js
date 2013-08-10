var _ = require('underscore')
  , redis = require('redis')
  , client = redis.createClient()
  , eventer = require('./../events').eventer;

require('sugar');

//a voting topic has a name
//a creator (email address)
//an expiry in minutes
//a list of choices:
//choices should hold the html for a radio box?

//note - this means that anyone who can access the URL of the
//topic can vote (easier than inviting people).

var Poll = function(name, creator, expires, choices, votes){
  this.name       = name;
  this.creator    = creator;
  this.expires    = expires;
  this.choices    = choices;
  this.createdAt  = new Date();
  this.uri        = name.dasherize();
  if (votes){
    this.votes      = votes;
  }
  else {
    this.votes      = [];
  }

  this.addVote = function(vote){
    this.votes.push(vote);
    this.save();
    eventer.emit('vote', vote);
  }

  this.votesFor = function(choice){
    var matcher = function(vote){
      if(vote.choice == choice.value) return true;
    }

    var total = _.select(this.votes, matcher).length;
    return {
      total: total,
      percentile: this.asPercentile(total) || 0
    }
  }

  this.asPercentile = function(count){
    return (count/this.votes.length) * 100;
  }

  this.textFor = function(choiceValue){
    var matcher = function(choice){
      if(choice.value == choiceValue) {
        return true;
      }
    }
    return _.find(this.choices, matcher).text
  }

  this.save = function(){
    poll = this;

    client.get(poll.uri, function(err, data){
      // if (!data){
      //   eventer.emit('poll', poll);
      // }

      client.set(poll.uri, JSON.stringify(poll));
    });
  }
}

Poll.fromJSON = function(json){
  var data = JSON.parse(json);
  poll =  new Poll(data.name, data.creator, data.expires, data.choices, data.votes);
  return poll;
}

Poll.find = function(uri, cb){
  client.get(uri, function(err, result){
    cb(err, Poll.fromJSON(result))
  });
}

module.exports = Poll;
