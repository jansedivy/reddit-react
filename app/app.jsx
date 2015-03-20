var React = require('react');
var Router = require('react-router');

var App = React.createClass({
  getInitialState() {
    return {
      showSidebar: false
    };
  },

  handleClick(e) {
    e.preventDefault();
    this.setState({ showSidebar: !this.state.showSidebar });
  },

  render() {
    var containerClass = 'main-container';
    if (this.state.showSidebar) {
      containerClass += ' show-sidebar';
    }

    return (
      <div className={containerClass}>
        <div className="app">
          <header className="main-header">
            <a href="#" onClick={this.handleClick}>Toggle sidebar</a>
            <h1>Reddit app</h1>
          </header>
          <div className="content">
            <div className="inside">
              <Router.RouteHandler {...this.props}/>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <h1>Sidebar</h1>

          <ul>
            <li><Router.Link to="/">Favorites</Router.Link></li>
            <li><Router.Link to="/search">Search</Router.Link></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = App;
