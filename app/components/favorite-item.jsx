var React = require('react');
var { Link } = require('react-router');

var FavoriteItem = React.createClass({
  render() {
    return (
      <li className="favorite-item">
        <Link to="subreddit" params={this.props.item}>{this.props.item.name}</Link>
      </li>
    );
  }
});

module.exports = FavoriteItem;
