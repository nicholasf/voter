var PollCtrl = function($scope, $http) {
  var pollUri  = document.location.pathname.match(/\/([^\/]*)$/)[1];

  var monitorPoll = function() {
    var sockjs_url  = '/multiplex';
    var sockjs      = new SockJS(sockjs_url);
    var multiplexer = new WebSocketMultiplex(sockjs);
    var pollChannel = multiplexer.channel(pollUri);

    pollChannel.onopen    = function(){ console.log('channel opened')};
    pollChannel.onmessage = onMessage;
    pollChannel.onclose   = function(){ console.log('channel closed')};
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
};