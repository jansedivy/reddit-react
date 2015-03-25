var React = require('react');
var classnames = require('classnames');

var Markdown = require('./markdown');
var DateFormat = require('./date-format');

var Reddit = require('../reddit');

var PureRenderMixin = React.addons.PureRenderMixin;

var CommentList = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      loading: false,
      comments: []
    };
  },

  loadNested(e, data) {
    e.preventDefault();

    this.setState({
      loading: true
    });

    Reddit.getMoreComments(this.props.detail.name, data).then(result => {
      this.setState({
        comments: this.props.comments.filter(item => !item.more).concat(result),
        loading: false
      });
    });
  },

  render() {
    var comments = this.state.comments.length ? this.state.comments : this.props.comments;

    var items = comments.map(item => {
      if (item.more) {
        return (
          <a href="#" className="load-more-nested-comments" onClick={(e) => this.loadNested(e, item) } key={item.id}>
            {this.state.loading ? 'Loading...' : 'More'}
          </a>
        );
      } else {
        return <CommentItem data={item} key={item.id} detail={this.props.detail}/>;
      }
    });

    return <div>{items}</div>;
  }
});

var CommentItem = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      showNested: true,
      loading: false
    };
  },

  toggleNestedComments(e) {
    e.preventDefault();

    this.setState({
      showNested: !this.state.showNested
    });
  },

  render() {
    var nested;
    if (this.state.showNested) {
      nested = (
        <div className="nested-comments">
          <CommentList comments={this.props.data.comments} detail={this.props.detail}/>
        </div>
      );
    }

    return (
      <div className="comment">
        <div className="comment-text">
          <h4>{this.props.data.score} - {this.props.data.author} <span className="comment-date"><DateFormat date={this.props.data.created}/></span></h4>
          <Markdown data={this.props.data.text}/>
          {this.props.data.comments.length ?
            <a href="#"
               className={classnames('toggle-comment-visiblity', { 'hidden-comments': !this.state.showNested })}
               onClick={this.toggleNestedComments}></a> : ''}
        </div>

        {nested}
      </div>
    );
  }
});

module.exports = CommentList;
