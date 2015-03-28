var Fetch = require('./fetch');
var extend = require('extend');

var Reddit = {
  URL: 'http://www.reddit.com/',

  subreddit(subreddit, options) {
    options = extend(true, {
      lastId: '',
      sort: 'hot'
    }, options);

    return Fetch.getJSON(Reddit.URL + 'r/' + subreddit + '/' + options.sort + '.json?after=' + options.lastId).then(function(data) {
      return {
        lastId: data.data.after,
        items: data.data.children.map(Reddit._formatTopic)
      };
    });
  },

  search(value) {
    return Fetch.getJSON(Reddit.URL + 'search.json?q=' + value).then(function(data) {
      return data.data.children.map(Reddit._formatTopic);
    });
  },

  findSubreddit(value, options) {
    options = extend(true, {
      limit: 5,
    }, options);

    return Fetch.getJSON(Reddit.URL + 'subreddits/search.json?q=' + value + '&limit=' + options.limit).then(function(data) {
      return data.data.children.map((item) => {
        return {
          name: item.data.display_name
        };
      });
    });
  },

  getMoreComments(name, item) {
    var query = `?link_id=${name}&children=${item.children.join(',')}&api_type=json`;

    return Fetch.getJSON(Reddit.URL + 'api/morechildren.json' + query).then(function(data) {
      return Reddit._mapComments(data.json.data.things);
    });
  },

  getComments(subreddit, id, options) {
    options = extend(true, {
      sort: 'hot'
    }, options);

    return Fetch.getJSON(Reddit.URL + 'r/' + subreddit + '/comments/' + id + '.json?sort=' + options.sort).then(function(data) {
      return {
        detail: Reddit._formatTopic(data[0].data.children[0]),
        comments: Reddit._mapComments(data[1].data.children)
      };
    });
  },

  _mapComments(data) {
    return data.map(function(item) {
      if (item.kind === 'more') {
        return {
          more: true,
          id: item.data.id,
          name: item.data.name,
          parent_id: item.data.parent_id,
          children: item.data.children
        };
      }

      var record = item.data;
      return {
        more: false,
        id: record.id,
        gold: record.gilded,
        author: record.author,
        text: record.body,
        score: record.score,
        created: record.created_utc,
        comments: record.replies ? Reddit._mapComments(record.replies.data.children) : []
      };
    }).filter(item => item);
  },

  _formatTopic(item) {
    var record = item.data;
    return {
      id: record.id,
      name: record.name,
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
