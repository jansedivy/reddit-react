var React = require('react');
var Link = require('react-router').Link;
var DateFormat = require('./date-format');

var RecordItem = React.createClass({
  getTitleLink() {
    var title = this.props.data.title;

    if (this.props.data.external) {
      return <a className="record-title-link" href={this.props.data.url}>{title}</a>;
    } else {
      return <Link className="record-title-link" to="comments" params={{ name: this.props.data.subreddit, id: this.props.data.id }}>{title}</Link>;
    }
  },

  getThumbnail() {
    var path = this.props.data.image;
    if (path && path !== 'self' && path !== 'default') {
      return <img src={this.props.data.image} width="50px" className="thumbnail"/>;
    }
  },

  render() {
    return (
      <div className="record-item">
        <span className="score">{this.props.data.score}</span>
        {this.getThumbnail()}
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
