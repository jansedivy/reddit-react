var React = require('react');
var classnames = require('classnames');

var Markdown = require('./markdown');
var DateFormat = require('./date-format');

var Reddit = require('../reddit');

var CommentItem = React.createClass({
  getInitialState() {
    return {
      showNested: true,
      comments: this.props.data.comments,
      loading: false
    };
  },

  toggleNestedComments(e) {
    e.preventDefault();

    this.setState({
      showNested: !this.state.showNested
    });
  },

  loadNested(e, data) {
    e.preventDefault();
    this.setState({
      loading: true
    });

    Reddit.getMoreComments(this.props.topic.name, data).then(result => {
      this.setState({
        comments: this.state.comments.filter(item => !item.more).concat(result),
        loading: false
      });
    });
  },

  getNestedComments() {
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    var nestedComments = this.state.comments.map((item) => {
      if (item.more) {
        return (
          <a href="#" className="load-more-nested-comments" onClick={(e) => this.loadNested(e, item) } key={item.id}>
          {this.state.loading ? 'Loading...' : 'More'}
          </a>
        );
      } else {
        return <CommentItem data={item} key={item.id} topic={this.props.topic}/>;
      }
    });

    if (!this.state.showNested || !nestedComments.length) {
      return;
    }

    return (
      <div className="nested-comments">
        <ReactCSSTransitionGroup transitionName="example">
          {nestedComments}
        </ReactCSSTransitionGroup>
      </div>
    );
  },

  render() {
    return (
      <div className="comment">
        <div className="comment-text">
          <h4>{this.props.data.score} - {this.props.data.author} <span className="comment-date"><DateFormat date={this.props.data.created}/></span></h4>
          <Markdown data={this.props.data.text}/>
          {this.state.comments.length ?
            <a href="#"
               className={classnames('toggle-comment-visiblity', { 'hidden-comments': !this.state.showNested })}
               onClick={this.toggleNestedComments}></a> : ''}
        </div>

        {this.getNestedComments()}
      </div>
    );
  }
});

module.exports = CommentItem;
