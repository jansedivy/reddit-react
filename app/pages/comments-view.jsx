var React = require('react');

var Reddit = require('../reddit');
var CommentItem = require('../components/comment-item');
var DetailView = require('../components/detail-view');

var CommentsView = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState() {
    var params = this.context.router.getCurrentParams();

    return {
      subreddit: params.name,
      id: params.id,
      comments: [],
      detail: {}
    };
  },

  componentDidMount() {
    Reddit.getComments(this.state.subreddit, this.state.id).then(data => {
      this.setState({
        detail: data.detail,
        comments: data.comments
      });
    });
  },

  render() {
    var items = this.state.comments.map(item => {
      if (item.more) {
        return <h1 key={item.id}>More</h1>;
      } else {
        return <CommentItem data={item} key={item.id} topic={this.state.detail}/>;
      }
    });

    return (
      <div>
        <DetailView data={this.state.detail}/>
        {items}
      </div>
    );
  }
});

module.exports = CommentsView;
