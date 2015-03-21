var React = require('react');
var Link = require('react-router').Link;
var Favorites = require('../favorites');
var FavoriteItem = require('../components/favorite-item');

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
        <ul className="favorite-list">
          {this.state.subreddits.map((item) =>
                                     <FavoriteItem key={item.name} item={item}/>
                                    )}
        </ul>
        {this.getAddPartial()}
      </div>
    );
  }
});

module.exports = FavoritesView;
