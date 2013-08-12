var events              = require('events')
  , eventer             = new events.EventEmitter()
  , sockjs              = require('sockjs')
  , websocket_multiplex = require('websocket-multiplex')
  , channels            = {}
  , _                   = require('underscore');

var sockjs_opts = {sockjs_url: "http://localhost:3000/lib/sockjs/sockjs.min.js"};
var service = sockjs.createServer(sockjs_opts);
var multiplexer = new websocket_multiplex.MultiplexServer(service);

/** call from app.js **/
exports.setup = function(server){
  service.installHandlers(server, {prefix:'/multiplex'});
}

var PollChannel = function(channel, poll){
  this.channel     = channel;
  this.poll        = poll;
  this.connections = [];

  var pollChannel  = this;
  channel.on('connection', function(conn){
    console.log("**** pushing a connection for ", poll.uri);
    pollChannel.connections.push(conn);
 
    //refresh the poll with current votes
    poll.constructor.find(poll.uri, function(err, poll){
      var payload = {action: "connected", poll: poll};
      conn.write(JSON.stringify(payload), pollChannel.connections);
    });
    
  })
}

eventer.on('poll', function(poll){
  console.log("received a poll");
  var pollChannel = new PollChannel(multiplexer.registerChannel(poll.uri), poll);
  console.log(pollChannel);
  channels[poll.uri] = pollChannel;
})

eventer.on('vote', function(poll){
  //find the poll channel
  //send a message to all of its connections.
  console.log("the channels .... ");
  console.log(channels);
  var pollChannel = channels[poll.uri];

  var notifier = function(connection){
    var payload = {action: 'vote', poll: poll}
    connection.write(JSON.stringify(payload));
  }

  _.each(pollChannel.connections, notifier);
})

exports.eventer = eventer;

