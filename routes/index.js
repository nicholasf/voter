var welcomer      = require('./../controllers/welcome_controller');
var polls         = require('./../controllers/polls_controller');
var votes         = require('./../controllers/votes_controller');
// var users         = require('./../controllers/users_controller');

exports.setup = function(app) {
  app.get('/',                    welcomer.home);
  app.get('/db',                  welcomer.db);
  app.get('/polls/:pollId',       polls.getPoll, polls.show);
  app.get('/polls/:pollId/vote',  polls.getPoll, votes.new);
  app.post('/polls/:pollId/vote', polls.getPoll, votes.create);
}

