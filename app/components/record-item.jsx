var React = require('react');
var Link = require('react-router').Link;

var RecordItem = React.createClass({
  render() {
    return (
      <div className="record-item">
        <span className="score">{this.props.data.score}</span>
        <div className="info">
          <a href={this.props.data.url}>{this.props.data.title}</a>
          <div className="meta">
            <Link to="comments" params={{ name: this.props.data.subreddit, id: this.props.data.id }}>{this.props.data.commentCounts} Comments</Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RecordItem;
