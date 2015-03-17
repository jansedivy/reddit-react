var React = require('react');
var Markdown = require('./markdown');

var CommentItem = React.createClass({
  render() {
    var nestedComments = this.props.data.comments.map(function(item) {
      return <CommentItem data={item}/>;
    });

    return (
      <div className="comment">
        <h4>{this.props.data.score} - {this.props.data.author}</h4>
        <Markdown data={this.props.data.text}/>
        <div className="nested-comments">{nestedComments}</div>
      </div>
    );
  }
});

module.exports = CommentItem;
