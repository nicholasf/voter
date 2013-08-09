var welcomer  = require('./../controllers/welcome_controller')
var users     = require('./../controllers/users_controller')

exports.setup = function(app) {
  app.get('/', welcomer.home);
  // app.get('/users', user.list);
}


/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };
