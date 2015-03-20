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
    var sidebarClass = 'sidebar';
    if (this.state.showSidebar) {
      sidebarClass += ' show-sidebar';
    }

    var headerClass = 'main-header';
    if (this.state.showSidebar) {
      headerClass += ' slide-out';
    }

    var contentClass = 'content';
    if (this.state.showSidebar) {
      contentClass += ' slide-out';
    }

    return (
      <div className="main-container">
        <div className="app">
          <header className={headerClass}>
            <a href="#" onClick={this.handleClick}>Toggle sidebar</a>
            <h1>Reddit app</h1>
          </header>

          <div className={contentClass}>
            <div className="inside">
              <Router.RouteHandler {...this.props}/>
            </div>
          </div>
        </div>

        <div className={sidebarClass}>
          <div className="sidebar-inside">
            <h1>Sidebar</h1>

            <ul>
              <li><Router.Link to="/">Favorites</Router.Link></li>
              <li><Router.Link to="/search">Search</Router.Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
