var events = require('events')
  , eventer = new events.EventEmitter()
  , sockjs  = require('sockjs')
  , echo = sockjs.createServer();

/** call from app.js **/
exports.setup = function(server){
  echo.installHandlers(server, {prefix:'/echo'});
}

echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        console.log("ok ...", message);
        console.log(arguments);
        conn.write(message);
    });
    conn.on('close', function() {});
});

eventer.on('vote', function(vote){
  console.log(vote, " <<<<< ");
})

exports.eventer = eventer;

