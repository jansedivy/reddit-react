var React = require('react');

var Reddit = require('../reddit');
var DetailView = require('../components/detail-view');
var CommentList = require('../components/comment-list');

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
      detail: {},
      loading: false
    };
  },

  componentDidMount() {
    this.setState({
      loading: true
    });

    Reddit.getComments(this.state.subreddit, this.state.id).then(data => {
      this.setState({
        detail: data.detail,
        comments: data.comments,
        loading: false
      });
    });
  },

  render() {
    return this.state.loading ? (
      <h3>Loading</h3>
    ) : (
      <div>
        <DetailView data={this.state.detail}/>;
        <CommentList comments={this.state.comments} detail={this.state.detail} loadNestedFor={this.loadNestedFor}/>
      </div>
    );
  }
});

module.exports = CommentsView;
