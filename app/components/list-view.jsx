var React = require('react');
var RecordItem = require('./record-item');

var PureRenderMixin = require('react-addons-pure-render-mixin');

var ListView = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    var items = this.props.items.map(function(item) {
      return <RecordItem data={item} key={item.id}/>;
    });

    return <div className="record-list">{items}</div>;
  }
});

module.exports = ListView;
