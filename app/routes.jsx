var React = require('react');
var Router = require('react-router');

var App = require('./components/app');
var ListView = require('./components/list-view');

var routes = (
  <Router.Route name="app" path="/" handler={App}>
    <Router.DefaultRoute handler={ListView}/>

  </Router.Route>
);

module.exports = routes;
