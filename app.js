/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , user    = require('./routes/user')
  , http    = require('http')
  , path    = require('path')
  , env     = require('./conf/env')
  , stylus  = require('stylus');

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

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
