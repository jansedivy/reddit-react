var React = require('react');
var Router = require('react-router');

require('./index.scss');

var fastclick = require('fastclick');
fastclick.attach(document.body);

// React.initializeTouchEvents(true);

var routes = require('./routes');
routes.init();

// Router.run(routes, (Handler) => {
//   React.render(<Handler/>, document.querySelector('.main-react-container'));
// });
