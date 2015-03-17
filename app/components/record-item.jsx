var React = require('react');
var Link = require('react-router').Link;
var DateFormat = require('./date-format');

var RecordItem = React.createClass({
  render() {
    return (
      <div className="record-item">
        <span className="score">{this.props.data.score}</span>
        <div className="info">
          <a href={this.props.data.url}>{this.props.data.title}</a>
          <ul className="meta">
            <li>
              <Link to="comments" params={{ name: this.props.data.subreddit, id: this.props.data.id }}>{this.props.data.commentCounts} Comments</Link>
            </li>
            <li>
              <DateFormat date={this.props.data.created}/>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = RecordItem;
