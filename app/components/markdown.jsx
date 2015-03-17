var React = require('react');

var Remarkable = require('remarkable');
var md = new Remarkable({
  html: false,
  linkify: true
});

var Markdown = React.createClass({
  render() {
    return <div dangerouslySetInnerHTML={{__html: md.render(this.props.data)}}/>;
  }
});

module.exports = Markdown;
