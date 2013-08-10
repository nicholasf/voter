var VoteCtrl = function($scope, $http) {

  var monitorPoll = function() {
    var sockjs_url  = '/multiplex';
    var sockjs      = new SockJS(sockjs_url);
    var multiplexer = new WebSocketMultiplex(sockjs);
    var pollChannel = multiplexer.channel($scope.poll.uri);

    pollChannel.onopen    = function(){ alert('channel opened')};
    pollChannel.onmessage = function(msg){ alert('msg received: ' + JSON.stringify(msg))};
    pollChannel.onclose   = function(){ alert('channel closed')};
  };

  var refreshData = function() {
    // HACK: this is an ugly solution....
    var rootUrl = document.location.pathname.replace('/vote', '') + '.json';
    $http.get(rootUrl).success(function(data){
      $scope.poll = data;
      monitorPoll();
      console.log('name:', $scope.poll.name);
    });
  };

  refreshData();
};