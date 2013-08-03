var Application = function() {

};

Application.prototype = {
  start: function() {
    $(document).ready(function() {
      console.log('Application started...');
    });
    return this;
  }
};
