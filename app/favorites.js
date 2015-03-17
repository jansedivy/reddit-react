var store = require('store');

var Favorites = {
  all() {
    return store.get('favorites', []);
  },

  add(name) {
    return store.set('favorites', Favorites.all().concat({ name }));
  }
};

module.exports = Favorites;
