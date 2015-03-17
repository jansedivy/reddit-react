var React = require('react');
var Router = require('react-router');

var App = React.createClass({
  render() {
    return (
      <div className="App">
        <header>
          <div className="inside">
            <h1>Reddit app</h1>
            <ul>
              <li><Router.Link to="/">Favorites</Router.Link></li>
              <li><Router.Link to="/search">Search</Router.Link></li>
            </ul>
          </div>
        </header>
        <div className="content">
          <div className="inside">
            <Router.RouteHandler {...this.props}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
