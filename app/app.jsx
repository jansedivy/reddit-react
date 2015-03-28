var React = require('react');
var Router = require('react-router');
var classnames = require('classnames');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  childContextTypes: {
    pushRoute: React.PropTypes.func,
    clearRoutes: React.PropTypes.func
  },

  getChildContext() {
    return { pushRoute: this.pushRoute };
  },

  pushRoute() {
    this.setState({
      routesHistory: this.state.routesHistory.concat([{ name: this.context.router.getCurrentPath() }])
    });
  },

  clearRoutes() {
    this.setState({
      routesHistory: []
    });
  },

  getInitialState() {
    return {
      showSidebar: false,
      routesHistory: []
    };
  },

  handleClick(e) {
    e.preventDefault();
    this.toggleSidebar();
  },

  toggleSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar });
  },

  goBack(e) {
    e.preventDefault();

    if (this.state.routesHistory.length > 0) {
      this.context.router.transitionTo(this.state.routesHistory.pop().name);

      this.setState({
        routesHistory: this.state.routesHistory
      });
    }
  },

  handleSidebarClick() {
    this.toggleSidebar();
    this.clearRoutes();
  },

  render() {
    return (
      <div className="main-container">
        <div className="app">
          <header className={classnames('main-header', { 'slide-out': this.state.showSidebar })}>

            { this.state.routesHistory.length > 0 ? <a href="#" className="back-button nav-button" onClick={this.goBack}>Toggle sidebar</a> : null }

            <h1 className="header-title">Reddit app</h1>
            <a href="#" className="toggle-sidebar nav-button" onClick={this.handleClick}>Toggle sidebar</a>
          </header>

          <div className={classnames('content', 'scrollable', { 'slide-out': this.state.showSidebar })}>
            { this.state.showSidebar ? <div className="overlay" onClick={() => this.setState({ showSidebar: false })}></div> : '' }
            <div className="inside">
              <Router.RouteHandler {...this.props}/>
            </div>
          </div>
        </div>

        <div className={classnames('sidebar', { 'show-sidebar': this.state.showSidebar })}>
          <div className="sidebar-inside">
            <h1>Sidebar</h1>

            <ul className="list">
              <li><Router.Link to="/" onClick={this.handleSidebarClick}>Favorites</Router.Link></li>
              <li><Router.Link to="/search" onClick={this.handleSidebarClick}>Search</Router.Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
