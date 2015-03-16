var React = require('react');
var Reddit = require('../reddit');
var RecordItem = require('./record-item');

var ListView = React.createClass({
  getInitialState() {
    return { items: [] };
  },

  componentDidMount() {
    var self = this;
    Reddit.get('programming').then(function(data) {
      self.setState({ items: data });
    });
  },

  render() {
    var items = this.state.items.map(function(item) {
      return React.createElement(RecordItem, { data: item, key: item.id });
    });

    return React.createElement('div', null, items);
  }
});

module.exports = ListView;
