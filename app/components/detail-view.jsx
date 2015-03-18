var React = require('react');
var Markdown = require('./markdown');

var DetailView = React.createClass({
  getThumbnail() {
    var path = this.props.data.image;
    if (path && path !== 'self' && path !== 'default') {
      return <img src={this.props.data.image} width="50px" className="thumbnail"/>;
    }
  },

  getTitleLink() {
    var title = this.props.data.title;

    if (this.props.data.external) {
      return <a href={this.props.data.url}>{title}</a>;
    } else {
      return title;
    }
  },

  render() {
    return (
      <div>
        <h2>{this.getThumbnail()} {this.getTitleLink()}</h2>
        <Markdown data={this.props.data.text}/>
      </div>
    );
  }
});

module.exports = DetailView;
