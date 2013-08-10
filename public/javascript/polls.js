var PollsCtrl = function($scope, $http) {
  var refreshData = function() {
    $http.get('/polls.json').success(function(data){
      $scope.polls = data;
    });
  };

  $scope.addPoll = function(name, creator, expiresIn, choices) {
    var poll = {
      name: name,
      creator: creator,
      expiresIn: expiresIn,
      choices: choices
    };

    $http.post('/polls', poll)
      .success(function(){
        refreshData();
      });
  };

  $scope.deletePoll = function(poll) {
    console.log('Deleting', poll);
    $http.delete('/polls/'+ poll.uri)
      .success(function(){
        refreshData();
      });
  };

  refreshData();
};