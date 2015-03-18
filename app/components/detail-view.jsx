var React = require('react');
var Markdown = require('./markdown');

var DetailView = React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.data.title}</h2>
        <Markdown data={this.props.data.text}/>
      </div>
    );
  }
});

module.exports = DetailView;
