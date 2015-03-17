var React = require('react');
var moment = require('moment');

var DateFormat = React.createClass({
  render() {
    return <span>{moment.unix(this.props.date).fromNow()}</span>;
  }
});

module.exports = DateFormat;
