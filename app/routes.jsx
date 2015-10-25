var React = require('react');
import { Router, Route, DefaultRoute, IndexRoute } from 'react-router';
import { render } from 'react-dom';

import createHashHistory from 'history/lib/createHashHistory';

var App = require('./app');
var SubredditView = require('./pages/subreddit-view');
var FavoritesView = require('./pages/favorites-view');
var CommentsView = require('./pages/comments-view');
var SearchView = require('./pages/search-view');
var NotFound = require('./pages/not-found');

var init = function() {
  render((
    <Router history={createHashHistory()}>
      <Route name="app" path="/" component={App}>
        <IndexRoute name="favorites" component={FavoritesView}/>
        <Route name="search" path="search" component={SearchView}/>
        <Route name="subreddit" path="r/:name" component={SubredditView}/>
        <Route name="comments" path="r/:name/comments/:id" component={CommentsView}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  ), document.querySelector('.main-react-container'));
};

module.exports = {
  init: init
};

