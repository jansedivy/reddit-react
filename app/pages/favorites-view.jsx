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

    var input = React.findDOMNode(this.refs.newSubreddit).value.trim();

    Favorites.add(input);

    this.setState({
      subreddits: Favorites.all()
    });

    this.closeForm();
  },

  showAdd(e) {
    e.preventDefault();

    this.setState({
      showAddForm: true
    });
  },

  closeForm() {
    this.setState({
      showAddForm: false
    });

    this.refs.newSubreddit.getDOMNode().value = '';
  },

  getAddPartial() {
    if (this.state.showAddForm) {
      return (
        <form onBlur={this.closeForm} onSubmit={this.handleSubmit}>
          <input autoFocus type="text" ref="newSubreddit"/>
        </form>
      );
    } else {
      return <a href="#" onClick={this.showAdd}>Add</a>;
    }
  },

  render() {
    return (
      <div>
        <ul>
          {this.state.subreddits.map((item) =>
                                     <li key={item.name}><Link to="subreddit" params={item}>{item.name}</Link></li>
                                    )}
        </ul>
        {this.getAddPartial()}
      </div>
    );
  }
});

module.exports = FavoritesView;
