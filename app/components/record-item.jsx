var React = require('react');

var RecordItem = React.createClass({
  render() {
    return (
      <div>
        {this.props.data.title} - {this.props.data.commentCounts}
      </div>
    );
  }
});

module.exports = RecordItem;
