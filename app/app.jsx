var React = require('react');
var Router = require('react-router');
var classnames = require('classnames');

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
    return (
      <div className="main-container">
        <div className="app">
          <header className={classnames('main-header', { 'slide-out': this.state.showSidebar })}>
            <a href="#" className="toggle-sidebar" onClick={this.handleClick}>Toggle sidebar</a>
            <h1 className="header-title">Reddit app</h1>
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
