var React = require('react');
var Link = require('react-router').Link;

var FavoritesView = React.createClass({
  getInitialState() {
    return {
      subreddits: [
        { name: 'programming' },
        { name: 'gamedev' },
        { name: 'rust' }
      ]
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
