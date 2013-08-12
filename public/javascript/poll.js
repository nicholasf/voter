var PollCtrl = function($scope, $http) {
  var clockRefreshInterval = 1000;
  var pollUri  = document.location.pathname.match(/\/([^\/]*)$/)[1];
  $scope.counter = { seconds: 9999};

  var monitorPoll = function() {
    var sockjs_url  = '/multiplex';
    var sockjs      = new SockJS(sockjs_url);
    var multiplexer = new WebSocketMultiplex(sockjs);
    var pollChannel = multiplexer.channel(pollUri);

    pollChannel.onopen    = function(){ console.log('channel opened')};
    pollChannel.onmessage = onMessage;
    pollChannel.onclose   = function(){ console.log('channel closed')};
  };

  var updateTimer = function() {
    var updateClock = function() {
      $scope.$apply( function() {
        if(!$scope.poll) return ($scope.counter = { seconds: 0});

        var duration = $scope.poll.expires * 60 * 1000;
        var started  = new Date($scope.poll.createdAt).getTime();
        var endsAt   = started + duration;
        var timeLeft =  endsAt - Date.now();
        if(timeLeft < 0) return ($scope.counter = { seconds: 0});

        var seconds = Math.ceil(timeLeft / 1000);
        setTimeout(updateClock, clockRefreshInterval);
        $scope.counter = { seconds: seconds};
      });
    };

    if(!$scope.counter) updateClock();
    setTimeout(updateClock, clockRefreshInterval);
  };

  var onMessage = function(msg){
    var data = JSON.parse(msg.data);
    console.log('msg received: ', data);

    if(data.poll) {
      $scope.$apply( function() {
        $scope.poll = data.poll;
      });
    }
  };

  $scope.lodgeVote = function(choice) {
    if(!$scope.voter) return;
    var path = document.location.pathname + '/vote';
    $http.post(path, {pollId: pollUri, voter: $scope.voter, choice: choice.value})
  };

  monitorPoll();
  // updateTimer();
};