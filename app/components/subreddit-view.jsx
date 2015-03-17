var React = require('react');
var Router = require('react-router');

var Reddit = require('../reddit');

var ListView = require('./list-view');

var SubredditView = React.createClass({
  mixins: [ Router.State ],

  getInitialState() {
    return {
      name: this.getParams().name,
      items: []
    };
  },

  componentDidMount() {
    var self = this;
    Reddit.get(this.state.name).then(function(data) {
      self.setState({
        items: data
      });
    });
  },

  render() {
    return <ListView items={this.state.items}/>;
  }
});

module.exports = SubredditView;
