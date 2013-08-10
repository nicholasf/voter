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
  this.channel  = channel;
  this.poll     = poll;
  this.connections = [];
  var pollChannel = this;
  channel.on('connection', function(conn){
    console.log("**** pushing a connection for ", poll.uri);
    pollChannel.connections.push(conn);
    conn.write("Connected!", pollChannel.connections);
  })
}

eventer.on('poll', function(vote){
  console.log("received a poll");
  var pollChannel = new PollChannel(multiplexer.registerChannel(poll.uri), poll);
  console.log(pollChannel);
  channels[poll.uri] = pollChannel;
})

eventer.on('vote', function(vote){
  //find the poll channel
  //send a message to all of its connections.
  console.log("the channels .... ");
  console.log(channels);
  var pollChannel = channels[vote.pollUri];

  var notifier = function(connection){
    connection.write("hello! ");
    connection.write(JSON.stringify(vote));
  }

  _.each(pollChannel.connections, notifier);
  console.log(vote, " new vote ");
})

exports.eventer = eventer;

