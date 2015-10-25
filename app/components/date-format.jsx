var React = require('react');
var moment = require('moment');

var PureRenderMixin = require('react-addons-pure-render-mixin');

var DateFormat = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return <span>{moment.unix(this.props.date).fromNow()}</span>;
  }
});

module.exports = DateFormat;
