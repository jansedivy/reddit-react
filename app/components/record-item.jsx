var React = require('react');
var Link = require('react-router').Link;
var DateFormat = require('./date-format');

var RecordItem = React.createClass({
  render() {
    var title = this.props.data.title;

    var link = null;
    if (this.props.data.external) {
      link = <a href={this.props.data.url}>{title}</a>;
    } else {
      link = <Link to="comments" params={{ name: this.props.data.subreddit, id: this.props.data.id }}>{title}</Link>;
    }

    return (
      <div className="record-item">
        <span className="score">{this.props.data.score}</span>
        <div className="info">
          {link}
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
