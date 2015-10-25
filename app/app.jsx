var React = require('react');
import { Router, Link } from 'react-router';
var classnames = require('classnames');

var App = React.createClass({
  contextTypes: {
    location: React.PropTypes.object
  },

  childContextTypes: {
    pushRoute: React.PropTypes.func,
    clearRoutes: React.PropTypes.func,
    setNavigatorTitle: React.PropTypes.func
  },

  getChildContext() {
    return {
      pushRoute: this.pushRoute,
      clearRoutes: this.clearRoutes,
      setNavigatorTitle: this.setNavigatorTitle
    };
  },

  setNavigatorTitle(value) {
    this.setState({
      title: value
    });
  },

  pushRoute() {
    this.setState({
      routesHistory: this.state.routesHistory.concat([{ name: this.context.location.pathname }])
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
      routesHistory: [],
      title: 'Reddit'
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
      var url = this.state.routesHistory.pop().name;
      this.props.history.pushState(null, url);

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
            <div className="nav-edge">
              { this.state.routesHistory.length > 0 ? <a href="#" className="back-button nav-button" onClick={this.goBack}>Toggle sidebar</a> : null }
            </div>

            <h1 className="header-title">{this.state.title}</h1>

            <div className="nav-edge">
              <a href="#" className="toggle-sidebar nav-button" onClick={this.handleClick}>Toggle sidebar</a>
            </div>
          </header>

          <div className="scrollable">
            <div className={classnames('content', { 'slide-out': this.state.showSidebar })}>
              { this.state.showSidebar ? <div className="overlay" onClick={() => this.setState({ showSidebar: false })}></div> : '' }
              <div className="inside">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>

        <div className={classnames('sidebar', { 'show-sidebar': this.state.showSidebar })}>
          <div className="sidebar-inside">
            <h1>Sidebar</h1>

            <ul className="list">
              <li><Link to="/" onClick={this.handleSidebarClick}>Favorites</Link></li>
              <li><Link to="/search" onClick={this.handleSidebarClick}>Search</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
