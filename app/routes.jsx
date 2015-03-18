var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./components/app');
var SubredditView = require('./components/subreddit-view');
var FavoritesView = require('./components/favorites-view');
var CommentsView = require('./components/comments-view');
var SearchView = require('./components/search-view');
var NotFound = require('./components/not-found');

var routes = (
  <Route>
    <Route name="app" path="/" handler={App}>
      <DefaultRoute handler={FavoritesView}/>
      <Route name="search" path="search" handler={SearchView}/>
      <Route name="subreddit" path="r/:name" handler={SubredditView}/>
      <Route name="comments" path="r/:name/comments/:id" handler={CommentsView}/>
    </Route>

    <NotFoundRoute handler={NotFound}/>
  </Route>
);

module.exports = routes;
