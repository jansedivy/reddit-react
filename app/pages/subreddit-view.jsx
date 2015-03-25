var React = require('react');

var Reddit = require('../reddit');

var ListView = require('../components/list-view');

var SubredditView = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      name: this.context.router.getCurrentParams().name,
      lastId: null,
      items: [],
      isLoading: true,
      sort: 'hot'
    };
  },

  loadMore(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    Reddit.subreddit(this.state.name, { lastId: this.state.lastId, sort: this.state.sort }).then(data => {
      this.setState({
        items: this.state.items.concat(data.items),
        lastId: data.lastId,
        isLoading: false
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
      <span>Loading</span>
    ) : (
      <div>
        <h2>{this.state.name}</h2>
        <ListView items={this.state.items}/>
        <a href="#" onClick={this.loadMore}>Load more</a>
      </div>
    );

    return (
      <div>
        <ul className="sort-list toggle-list">
          <li><a href="#" className={this.state.sort === 'hot' ? 'active' : ''} onClick={this.handleSortButton.bind(this, 'hot')}>Hot</a></li>
          <li><a href="#" className={this.state.sort === 'top' ? 'active' : ''} onClick={this.handleSortButton.bind(this, 'top')}>Top</a></li>
          <li><a href="#" className={this.state.sort === 'new' ? 'active' : ''} onClick={this.handleSortButton.bind(this, 'new')}>New</a></li>
        </ul>

        {main}
      </div>
    );
  }
});

module.exports = SubredditView;
