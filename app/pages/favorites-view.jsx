var React = require('react');
var Link = require('react-router').Link;
var Favorites = require('../favorites');
var FavoriteItem = require('../components/favorite-item');
var AutoComplete = require('../components/autocomplete');

var PureRenderMixin = React.addons.PureRenderMixin;

var FavoritesView = React.createClass({
  mixins: [PureRenderMixin],

  contextTypes: {
    setNavigatorTitle: React.PropTypes.func
  },

  getInitialState() {
    return {
      subreddits: Favorites.all(),
      showAddForm: false
    };
  },

  componentDidMount() {
    this.context.setNavigatorTitle('Reddit');
  },

  handleSubmit(e) {
    e.preventDefault();

    var input = this.refs.newSubreddit.getValue().trim();

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

    this.refs.newSubreddit.setValue('');
  },

  handleBlur() {
    if (this.refs.newSubreddit.getValue() === '') {
      this.closeForm();
    }
  },

  handleSelect(value) {
    Favorites.add(value.name);

    this.setState({
      subreddits: Favorites.all()
    });

    this.closeForm();
  },

  getAddPartial() {
    if (this.state.showAddForm) {
      return (
        <form onSubmit={this.handleSubmit}>
          <AutoComplete onBlur={this.handleBlur} ref="newSubreddit" autoFocus className="new-favorite-input" onInputSelect={this.handleSelect}/>
        </form>
      );
    } else {
      return <a href="#" className="add-new-favorite-button button" onClick={this.showAdd}>Add</a>;
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
