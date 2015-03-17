var React = require('react');
var Router = require('react-router');

var Reddit = require('../reddit');

var ListView = require('./list-view');

var SubredditView = React.createClass({
  mixins: [ Router.State ],

  getInitialState() {
    return {
      name: this.getParams().name,
      lastId: null,
      items: []
    };
  },

  loadMore(e) {
    e.preventDefault();

    Reddit.subreddit(this.state.name, { lastId: this.state.lastId }).then(data => {
      this.setState({
        items: this.state.items.concat(data.items),
        lastId: data.lastId
      });
    });
  },

  componentDidMount() {
    Reddit.subreddit(this.state.name).then(data => this.setState({ items: data.items, lastId: data.lastId }));
  },

  render() {
    return (
      <div>
        <ListView items={this.state.items}/>
        <a href="#" onClick={this.loadMore}>Load more</a>
      </div>
    );
  }
});

module.exports = SubredditView;
