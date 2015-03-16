var Fetch = {
  get: function(url) {
    return new Promise(function(resolve) {
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = function() {
        resolve(request.responseText);
      };
      request.send();
    });
  },

  getJSON: function(url) {
    if (Fetch._cache[url]) {
      return new Promise(function(resolve) {
        resolve(Fetch._cache[url]);
      });
    }

    return Fetch.get(url).then(function(data) {
      var result = JSON.parse(data);

      Fetch._cache[url] = result;

      return result;
    });
  },

  _cache: {}
};

module.exports = Fetch;
