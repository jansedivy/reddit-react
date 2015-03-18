var React = require('react');
var Router = require('react-router');

var Reddit = require('../reddit');
var CommentItem = require('./comment-item');
var DetailView = require('./detail-view');

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
    Reddit.getComments(this.state.subreddit, this.state.id).then(data => this.setState({ comments: data }));
  },

  render() {
    var items = this.state.comments.map(function(item) {
      return <CommentItem data={item} key={item.id}/>;
    });

    return (
      <div>
        <DetailView/>
        {items}
      </div>
    );
  }
});

module.exports = CommentsView;
