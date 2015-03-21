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
      isLoading: true
    };
  },

  loadMore(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    Reddit.subreddit(this.state.name, { lastId: this.state.lastId }).then(data => {
      this.setState({
        items: this.state.items.concat(data.items),
        lastId: data.lastId,
        isLoading: false
      });
    });
  },

  componentDidMount() {
    Reddit.subreddit(this.state.name).then(data => this.setState({ items: data.items, lastId: data.lastId, isLoading: false }));
  },

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <ListView items={this.state.items}/>
        {!this.state.isLoading ? <a href="#" onClick={this.loadMore}>Load more</a> : <span>Loading</span>}
      </div>
    );
  }
});

module.exports = SubredditView;
