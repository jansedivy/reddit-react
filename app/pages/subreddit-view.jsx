var React = require('react');

var Reddit = require('../reddit');

var ListView = require('../components/list-view');
var Spinner = require('../components/spinner');

var PureRenderMixin = React.addons.PureRenderMixin;

var SubredditView = React.createClass({
  mixins: [PureRenderMixin],

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      name: this.context.router.getCurrentParams().name,
      lastId: null,
      items: [],
      isLoading: true,
      isLoadingMore: false,
      sort: 'hot'
    };
  },

  loadMore(e) {
    e.preventDefault();

    this.setState({ isLoadingMore: true });

    Reddit.subreddit(this.state.name, { lastId: this.state.lastId, sort: this.state.sort }).then(data => {
      this.setState({
        items: this.state.items.concat(data.items),
        lastId: data.lastId,
        isLoadingMore: false
      });
    });
  },

  reload() {
    this.setState({ isLoading: true }, () => {
      Reddit.subreddit(this.state.name, { sort: this.state.sort }).then(data => {
        this.setState({
          items: data.items,
          lastId: data.lastId,
          isLoading: false
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

  componentDidMount() {
    this.reload();
  },

  render() {
    var main = this.state.isLoading ? (
      <Spinner/>
    ) : (
      <div>
        <ListView items={this.state.items}/>

        {this.state.isLoadingMore ? <Spinner/> : <a href="#" onClick={this.loadMore}>Load more</a>}
      </div>
    );

    return (
      <div>
        <ul className="sort-list toggle-list">
          <li><a href="#" className={this.state.sort === 'hot' ? 'active' : ''} onClick={this.handleSortButton.bind(this, 'hot')}>Hot</a></li>
          <li><a href="#" className={this.state.sort === 'top' ? 'active' : ''} onClick={this.handleSortButton.bind(this, 'top')}>Top</a></li>
          <li><a href="#" className={this.state.sort === 'new' ? 'active' : ''} onClick={this.handleSortButton.bind(this, 'new')}>New</a></li>
        </ul>

        <h2>{this.state.name}</h2>
        {main}
      </div>
    );
  }
});

module.exports = SubredditView;
