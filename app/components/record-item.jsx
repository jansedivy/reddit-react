var React = require('react');
var Link = require('react-router').Link;

var RecordItem = React.createClass({
  render() {
    return (
      <div>
        {this.props.data.title} - <Link to="comments" params={{ name: this.props.data.subreddit, id: this.props.data.id }}>{this.props.data.commentCounts} Comments</Link>
      </div>
    );
  }
});

module.exports = RecordItem;
