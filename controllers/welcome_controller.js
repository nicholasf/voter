var db   = require('./../db');
var path = require('path');

/*
 * GET home page.
 */
exports.home = function(req, res){
  // res.render('index', { title: 'Voter' });
  res.sendfile(path.resolve('public/app.html'));
}

exports.db = function(req, res){
  res.render('db', {db: db});
};
