var welcomer      = require('./../controllers/welcome_controller');
var polls         = require('./../controllers/polls_controller');
var votes         = require('./../controllers/votes_controller');
// var users         = require('./../controllers/users_controller');

exports.setup = function(app) {
  // app.get('/',                    welcomer.home);
  app.get('/db',                  welcomer.db);

  app.get('/',                    polls.getPolls, polls.list);
  app.get('/polls.json',          polls.getPolls, polls.listJSON);

  app.post('/polls',              polls.createPoll, polls.getPolls, polls.list);
  app.delete('/polls/:pollId',    polls.getPoll, polls.deletePoll, polls.delete);

  app.get(/\/polls\/([^\/]+)$/,        polls.getPoll, polls.show);

  app.post('/polls/:pollId/vote', polls.getPoll, votes.create);
}

