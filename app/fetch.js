var Fetch = {
  get(url) {
    return new Promise(function(resolve) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = function() {
        resolve(request.responseText);
      };
      request.send();
    });
  },

  getJSON(url) {
    return Fetch.get(url).then(JSON.parse);
  }
};

module.exports = Fetch;
