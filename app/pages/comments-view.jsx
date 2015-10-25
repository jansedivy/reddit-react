var React = require('react');

var Reddit = require('../reddit');
var DetailView = require('../components/detail-view');
var CommentList = require('../components/comment-list');
var Spinner = require('../components/spinner');

var PureRenderMixin = require('react-addons-pure-render-mixin');

var CommentsView = React.createClass({
  mixins: [PureRenderMixin],

  contextTypes: {
    setNavigatorTitle: React.PropTypes.func
  },

  getInitialState() {
    var params = this.props.params;

    return {
      subreddit: params.name,
      id: params.id,
      comments: [],
      detail: {},
      loading: false,
      loadingComments: false,
      sort: 'top'
    };
  },

  componentDidMount() {
    this.context.setNavigatorTitle('Comments');
    this.reload();
  },

  reload() {
    this.setState({ loadingComments: true }, () => {
      Reddit.getComments(this.state.subreddit, this.state.id, { sort: this.state.sort }).then(data => {
        this.setState({
          detail: data.detail,
          comments: data.comments,
          loadingComments: false
        });
      });
    });
  },

  handleSortButton(type, e) {
    e.preventDefault();
    this.setState({
      sort: type
    }, () => this.reload());
  },

  render() {
    return this.state.loading ? (
      <Spinner/>
    ) : (
      <div>
        <DetailView data={this.state.detail}/>
        <ul className="sort-list toggle-list">
          <li><a href="#" className={this.state.sort === 'hot' ? 'active' : ''} onClick={this.handleSortButton.bind(this, 'hot')}>Hot</a></li>
          <li><a href="#" className={this.state.sort === 'top' ? 'active' : ''} onClick={this.handleSortButton.bind(this, 'top')}>Top</a></li>
          <li><a href="#" className={this.state.sort === 'new' ? 'active' : ''} onClick={this.handleSortButton.bind(this, 'new')}>New</a></li>
        </ul>

        {this.state.loadingComments ? <Spinner/> : <CommentList comments={this.state.comments} detail={this.state.detail}/>}
      </div>
    );
  }
});

module.exports = CommentsView;
