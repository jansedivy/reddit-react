var React = require('react');
var Link = require('react-router').Link;

var RecordItem = React.createClass({
  render() {
    return (
      <div>
        <span className="score">{this.props.data.score}</span>
        <a href={this.props.data.url}>{this.props.data.title}</a> -
        <Link to="comments" params={{ name: this.props.data.subreddit, id: this.props.data.id }}>
          {this.props.data.commentCounts} Comments
        </Link>
      </div>
    );
  }
});

module.exports = RecordItem;
