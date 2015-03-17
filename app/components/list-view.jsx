var React = require('react');
var RecordItem = require('./record-item');

var ListView = React.createClass({
  render() {
    var items = this.props.items.map(function(item) {
      return <RecordItem data={item} key={item.id}/>;
    });

    return <div>{items}</div>;
  }
});

module.exports = ListView;
