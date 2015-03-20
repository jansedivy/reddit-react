var React = require('react');
var Router = require('react-router');

require('./index.scss');

var routes = require('./routes');

var fastclick = require('fastclick');
fastclick.attach(document.body);

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.body);
});
