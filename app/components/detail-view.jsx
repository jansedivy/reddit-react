var React = require('react');
var Markdown = require('./markdown');
var DateFormat = require('./date-format');

var PureRenderMixin = React.addons.PureRenderMixin;

var DetailView = React.createClass({
  mixins: [PureRenderMixin],

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
      <div className="detail-view">
        <h2 className="detail-title">{this.getThumbnail()} <span className="score">{this.props.data.score}</span> - {this.getTitleLink()}</h2>
        <div className="info">{this.props.data.author} - <DateFormat date={this.props.data.created}/></div>
        <Markdown data={this.props.data.text}/>
      </div>
    );
  }
});

module.exports = DetailView;
