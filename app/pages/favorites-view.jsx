var React = require('react');
var Link = require('react-router').Link;
var Favorites = require('../favorites');
var FavoriteItem = require('../components/favorite-item');

var PureRenderMixin = React.addons.PureRenderMixin;

var FavoritesView = React.createClass({
  mixins: [PureRenderMixin],

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
          <input autoFocus type="text" ref="newSubreddit" className="new-favorite-input"/>
        </form>
      );
    } else {
      return <a href="#" className="add-new-favorite-button" onClick={this.showAdd}>Add</a>;
    }
  },

  handleRemove(name) {
    Favorites.remove(name);

    this.setState({
      subreddits: Favorites.all()
    });
  },

  render() {
    return (
      <div>
        <ul className="favorite-list">
          {this.state.subreddits.map((item) =>
                                     <FavoriteItem key={item.name} item={item} onRemove={this.handleRemove}/>
                                    )}
        </ul>
        {this.getAddPartial()}
      </div>
    );
  }
});

module.exports = FavoritesView;
