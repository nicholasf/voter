/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , http    = require('http')
  , path    = require('path')
  , env     = require('./conf/env')
  , stylus  = require('stylus')
  , events  = require('./events');

var paths = {
  stylus: path.join(__dirname, 'public', 'stylesheets'),
  assets: path.join(__dirname, 'public'),
  views:  path.join(__dirname, 'views')
}

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', paths.views);
app.set('view engine', 'jade');
app.use(stylus.middleware({ src: paths.stylus, dest: paths.assets }));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(paths.assets));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes.setup(app);
server = http.createServer(app);
events.setup(server);

// var echo = sockjs.createServer();
// echo.on('connection', function(conn) {
//     conn.on('data', function(message) {
//         console.log("ok ...", message);
//         console.log(arguments);
//         conn.write(message);
//     });
//     conn.on('close', function() {});
// });

// echo.installHandlers(server, {prefix:'/echo'});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//setting up a voting topic, just to get some dummy data rolling
var Poll = require('./models/poll');
var choices = [{value: 1, text: "Talisker"}, {value: 2, text: "Oban"}, {value: 3, text: "Ardberg"}]
var poll = new Poll("Best single malt", "nicholasf", 30, choices);
poll.save(true);



