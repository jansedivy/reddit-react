var React = require('react');

var RecordItem = React.createClass({
  render() {
    return (
      <div>
        {this.props.data.title} - {this.props.data.commentsCount}
      </div>
    );
  }
});

module.exports = RecordItem;
