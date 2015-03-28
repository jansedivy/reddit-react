var React = require('react');
var Router = require('react-router');

require('./index.scss');

var routes = require('./routes');

var fastclick = require('fastclick');
fastclick.attach(document.body);

React.initializeTouchEvents(true);

require('./prevent-bounce')();

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.querySelector('.main-react-container'));
});
