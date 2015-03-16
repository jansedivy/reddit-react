var React = require('react');
var Router = require('react-router');

require('./index.scss');

var routes = require('./routes');

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler/>, document.body);
});
