var React = require('react');
var Link = require('react-router').Link;
var DateFormat = require('./date-format');

var RecordItem = React.createClass({
  getTitleLink() {
    var title = this.props.data.title;

    if (this.props.data.external) {
      return <a href={this.props.data.url}>{title}</a>;
    } else {
      return <Link to="comments" params={{ name: this.props.data.subreddit, id: this.props.data.id }}>{title}</Link>;
    }
  },

  render() {
    return (
      <div className="record-item">
        <span className="score">{this.props.data.score}</span>
        <div className="info">
          {this.getTitleLink()} <span className="domain">({this.props.data.domain})</span>
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
