var React = require('react');
var Router = require('react-router');

var App = React.createClass({
  render() {
    return (
      <div className="App">
        <h1>Reddit app</h1>
        <ul>
          <li><Router.Link to="/">Home</Router.Link></li>
        </ul>
        <div className="content">
          <Router.RouteHandler {...this.props}/>
        </div>
      </div>
    );
  }
});

module.exports = App;
