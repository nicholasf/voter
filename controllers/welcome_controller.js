var db = require('./../db');

/*
 * GET home page.
 */
exports.home = function(req, res){
  res.render('index', { title: 'Voter' });
}

exports.db = function(req, res){
  res.render('db', {db: db});
};
