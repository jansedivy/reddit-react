var Fetch = require('./fetch');
var extend = require('extend');

var Reddit = {
  subreddit(subreddit, options) {
    options = extend(true, {
      lastId: ''
    }, options);

    return Fetch.getJSON('http://www.reddit.com/r/' + subreddit + '.json?after=' + options.lastId).then(function(data) {
      return {
        lastId: data.data.after,
        items: data.data.children.map(Reddit._formatTopic)
      };
    });
  },

  search(value) {
    return Fetch.getJSON('http://www.reddit.com/search.json?q=' + value).then(function(data) {
      return data.data.children.map(Reddit._formatTopic);
    });
  },

  _mapComments(data) {
    return data.map(function(item) {
      if (item.kind === 'more') {
        // TOOD(sedivy): add loading more comments
        return null;
      }

      var record = item.data;
      return {
        id: record.id,
        author: record.author,
        text: record.body,
        score: record.score,
        created: record.created_utc,
        comments: record.replies ? Reddit._mapComments(record.replies.data.children) : []
      };
    }).filter(item => item);
  },

  getComments(subreddit, id) {
    return Fetch.getJSON('http://www.reddit.com/r/' + subreddit + '/comments/' + id + '.json').then(function(data) {
      return {
        detail: Reddit._formatTopic(data[0].data.children[0]),
        comments: Reddit._mapComments(data[1].data.children)
      };
    });
  },

  _formatTopic(item) {
    var record = item.data;
    return {
      id: record.id,
      image: record.thumbnail,
      domain: record.domain,
      text: record.selftext,
      subreddit: record.subreddit,
      url: record.url,
      author: record.author,
      commentCounts: record.num_comments,
      score: record.score,
      title: record.title,
      created: record.created_utc,
      external: !record.is_self
    };
  }
};

module.exports = Reddit;
