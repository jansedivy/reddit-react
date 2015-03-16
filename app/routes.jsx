var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/app');
var ListView = require('./components/list-view');
var FavoritesView = require('./components/favorites-view');
var CommentsView = require('./components/comments-view');

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={FavoritesView}/>
    <Route name="subreddit" path="r/:name" handler={ListView}/>
    <Route name="comments" path="r/:name/:id/comments" handler={CommentsView}/>
  </Route>
);

module.exports = routes;
