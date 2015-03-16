var React = require('react');

var CommentItem = React.createClass({
  render() {
    var nestedComments = this.props.data.comments.map(function(item) {
      return <CommentItem data={item}/>;
    });

    return (
      <div className="comment">
        <h4>{this.props.data.author}</h4>
        <p>{this.props.data.text}</p>
        <div className="nested-comments">{nestedComments}</div>
      </div>
    );
  }
});

module.exports = CommentItem;
