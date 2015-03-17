var React = require('react');
var Link = require('react-router').Link;
var Favorites = require('../favorites');

var FavoritesView = React.createClass({
  getInitialState() {
    return {
      subreddits: Favorites.all()
    };
  },

  render() {
    var items = this.state.subreddits.map(function(item) {
      return (
        <li key={item.id}>
          <Link to="subreddit" params={item}>{item.name}</Link>
        </li>
      );
    });

    return <ul>{items}</ul>;
  }
});

module.exports = FavoritesView;
