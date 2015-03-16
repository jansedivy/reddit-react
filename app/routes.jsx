var React = require('react');
var { Route, DefaultRoute } = require('react-router');

var App = require('./components/app');
var ListView = require('./components/list-view');
var FavoritesView = require('./components/favorites-view');

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={FavoritesView}/>
    <Route name="subreddit" path="r/:name" handler={ListView}/>
  </Route>
);

module.exports = routes;
