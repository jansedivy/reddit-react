var React = require('react');
var Link = require('react-router').Link;
var DateFormat = require('./date-format');
var classnames = require('classnames');

var PureRenderMixin = React.addons.PureRenderMixin;

var RecordItem = React.createClass({
  mixins: [PureRenderMixin],

  contextTypes: {
    pushRoute: React.PropTypes.func
  },

  getTitleLink() {
    var title = this.props.data.title;

    if (this.props.data.external) {
      return <a className="record-title-link" href={this.props.data.url}>{this.getThumbnail()} {title}</a>;
    } else {
      return <Link onClick={this.context.pushRoute} className="record-title-link" to="comments" params={{ name: this.props.data.subreddit, id: this.props.data.id }}>{this.getThumbnail()} {title}</Link>;
    }
  },

  getThumbnail() {
    var path = this.props.data.image;
    if (path && path !== 'self' && path !== 'default') {
      return <img src={this.props.data.image} className="thumbnail"/>;
    }
  },

  render() {
    return (
      <div className={classnames('record-item', { 'pinned': this.props.data.pinned })}>
        <span className="score">
          <span>
            {this.props.data.score}
          </span>
        </span>
        <div className="info">
          {this.getTitleLink()}
          <div className="meta">
            <div>
              <Link
                onClick={this.context.pushRoute}
                to="comments"
                params={{ name: this.props.data.subreddit, id: this.props.data.id }}>
                {this.props.data.commentCounts} Comments
              </Link>
            </div>
            <div>
              <DateFormat date={this.props.data.created}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RecordItem;
