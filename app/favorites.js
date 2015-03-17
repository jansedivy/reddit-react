var store = require('store');

var Favorites = {
  all() {
    return store.get('favorites', []);
  },

  add(name) {
    var existingItems = Favorites.all().filter(item => {
      return item.name.toLowerCase() === name.toLowerCase();
    });

    if (existingItems.length) {
      return existingItems[0];
    }

    return store.set('favorites', Favorites.all().concat({ name }));
  }
};

module.exports = Favorites;
