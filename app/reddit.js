var Fetch = require('./fetch');

var Reddit = {
  get: function(subreddit) {
    return Fetch.getJSON('http://www.reddit.com/r/' + subreddit + '.json').then(function(data) {
      return data.data.children.map(function(item) {
        var record = item.data;
        return {
          id: record.id,
          author: record.author,
          commentCounts: record.num_comments,
          score: record.score,
          title: record.title
        };
      });
    });
  },

  _mapComments: function(data) {
    return data.map(function(item) {
      var record = item.data;
      return {
        author: record.author,
        text: record.body,
        comments: record.replies ? Reddit._mapComments(record.replies.data.children) : []
      };
    });
  },

  getComments: function(subreddit, id) {
    return Fetch.getJSON('http://www.reddit.com/r/' + subreddit + '/comments/' + id + '.json').then(function(data) {
      return Reddit._mapComments(data[1].data.children);
    });
  }
};

module.exports = Reddit;
