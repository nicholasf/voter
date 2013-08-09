var welcomer      = require('./../controllers/welcome_controller');
var polls         = require('./../controllers/polls_controller');
var users         = require('./../controllers/users_controller');

exports.setup = function(app) {
  app.get('/', welcomer.home);
  app.get('/polls/:pollId', polls.show)
}

