var welcomer      = require('./../controllers/welcome_controller');
var votingTopics  = require('./../controllers/voting_topic_controller');
var users         = require('./../controllers/users_controller');

exports.setup = function(app) {
  app.get('/', welcomer.home);
  app.get('/voteon/:votingTopicId', votingTopics.show)
}

