var React = require('react');
var Markdown = require('./markdown');
var DateFormat = require('./date-format');

var CommentItem = React.createClass({
  getInitialState() {
    return {
      showNested: true
    };
  },

  toggleNestedComments(e) {
    e.preventDefault();

    this.setState({
      showNested: !this.state.showNested
    });
  },

  getNestedComments() {
    var nestedComments = this.props.data.comments.map(function(item) {
      return <CommentItem data={item} key={item.id}/>;
    });

    if (!this.state.showNested || !nestedComments.length) {
      return;
    }

    return <div className="nested-comments">{nestedComments}</div>;
  },

  render() {
    return (
      <div className="comment">
        <div className="comment-text">
          <h4>{this.props.data.score} - {this.props.data.author} <span className="comment-date"><DateFormat date={this.props.data.created}/></span></h4>
          <Markdown data={this.props.data.text}/>
          <a href="#" className="toggle-comment-visiblity" onClick={this.toggleNestedComments}></a>
        </div>
        {this.getNestedComments()}
      </div>
    );
  }
});

module.exports = CommentItem;
