
var PollsCtrl = function($scope, $http) {

  $scope.isAdmin = document.location.hash == '#admin';
  $scope.choices = [];

  var refreshData = function() {
    $http.get('/polls.json').success(function(data){
      $scope.polls = data;
    });
  };

  $scope.addChoice = function() {
    if(!$scope.newChoice) return;
    $scope.choices.push($scope.newChoice);
    $scope.newChoice = '';
  }

  $scope.addPoll = function(name, creator, expiresIn) {
    var poll = {
      name: name,
      creator: creator,
      expiresIn: expiresIn,
      choices: $scope.choices
    };

    $http.post('/polls', poll)
      .success(function(){
        refreshData();
      });
  };

  $scope.deletePoll = function(poll) {
    $http.delete('/polls/'+ poll.uri)
      .success(function(){
        refreshData();
      });
  };

  refreshData();
};