var Fetch = {
  get: function(url) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = function() {
        resolve(request.responseText);
      };
      request.send();
    });
  },

  getJSON: function(url) {
    return Fetch.get(url).then(function(data) {
      return JSON.parse(data);
    });
  }
};

module.exports = Fetch;
