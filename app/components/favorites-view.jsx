var React = require('react');
var Link = require('react-router').Link;
var Favorites = require('../favorites');

var FavoritesView = React.createClass({
  getInitialState() {
    return {
      subreddits: Favorites.all(),
      showAddForm: false
    };
  },

  handleSubmit(e) {
    e.preventDefault();

    var input = this.refs.newSubreddit.getDOMNode().value.trim();

    Favorites.add(input);

    this.setState({
      subreddits: Favorites.all(),
      showAddForm: false
    });

    this.refs.newSubreddit.getDOMNode().value = '';
  },

  showAdd(e) {
    e.preventDefault();

    this.setState({
      showAddForm: true
    });
  },

  getAddPartial() {
    if (this.state.showAddForm) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="newSubreddit"/>
          <input type="submit"/>
        </form>
      );
    } else {
      return <a href="#" onClick={this.showAdd}>Add</a>;
    }
  },

  render() {
    var items = this.state.subreddits.map(function(item) {
      return (
        <li key={item.id}>
          <Link to="subreddit" params={item}>{item.name}</Link>
        </li>
      );
    });

    return (
      <div>
        <ul>{items}</ul>

        {this.getAddPartial()}
      </div>
    );
  }
});

module.exports = FavoritesView;
