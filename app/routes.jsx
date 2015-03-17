var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/app');
var SubredditView = require('./components/subreddit-view');
var FavoritesView = require('./components/favorites-view');
var CommentsView = require('./components/comments-view');
var SearchView = require('./components/search-view');

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={FavoritesView}/>
    <Route name="search" path="search" handler={SearchView}/>
    <Route name="subreddit" path="r/:name" handler={SubredditView}/>
    <Route name="comments" path="r/:name/:id/comments" handler={CommentsView}/>
  </Route>
);

module.exports = routes;
