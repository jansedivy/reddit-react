var Fetch = {
  get(url) {
    if (Fetch._cache[url]) {
      return Promise.resolve(Fetch._cache[url]);
    }

    return new Promise(function(resolve) {
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = function() {
        Fetch._cache[url] = request.responseText;
        resolve(request.responseText);
      };
      request.send();
    });
  },

  getJSON(url) {
    return Fetch.get(url).then(JSON.parse);
  },

  _cache: {}
};

module.exports = Fetch;
