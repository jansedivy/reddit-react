var React = require('react');
var RecordItem = require('./record-item');

var PureRenderMixin = React.addons.PureRenderMixin;

var ListView = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    var items = this.props.items.map(function(item) {
      return <RecordItem data={item} key={item.id}/>;
    });

    return <div>{items}</div>;
  }
});

module.exports = ListView;
