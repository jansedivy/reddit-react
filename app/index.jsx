var React = require('react');
var Router = require('react-router');

require('./index.scss');

var routes = require('./routes');

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.body);
});
