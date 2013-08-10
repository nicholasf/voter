var UserList = function($scope) {
  $scope.users = [
    'Morris Mickelwhite',
    'Rodney Dangerfield',
    'Ted Danson'
  ],

  $scope.addUser = function() {
    $scope.users.push($scope.name);
    $scope.name = '';
  };

  $scope.deleteUser = function(user) {
    var i = $scope.users.indexOf(user);
    if(i != -1) $scope.users.splice(i, 1);
  };
}