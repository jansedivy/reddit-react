var React = require('react');
var Router = require('react-router');

var Reddit = require('../reddit');
var CommentItem = require('./comment-item');

var CommentsView = React.createClass({
  mixins: [ Router.State ],

  getInitialState() {
    var params = this.getParams();

    return {
      subreddit: params.name,
      id: params.id,
      comments: []
    };
  },

  componentDidMount() {
    var self = this;
    Reddit.getComments(this.state.subreddit, this.state.id).then(function(data) {
      self.setState({
        comments: data
      });
    });
  },

  render() {
    var items = this.state.comments.map(function(item) {
      return <CommentItem data={item} key={item.id}/>;
    });
    return <div>{items}</div>;
  }
});

module.exports = CommentsView;
