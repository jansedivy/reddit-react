var React = require('react');
var Spin = require('spin.js');

var Spinner = React.createClass({
  componentDidMount() {
    var spinner = new Spin({
      top: '50%',
      left: '50%',
      lines: 10,
      length: 7,
      width: 3,
      radius: 7
    });

    spinner.spin(React.findDOMNode(this.refs.spinner));
  },

  render() {
    return <div className="spinner"><span ref="spinner"/></div>;
  }
});

module.exports = Spinner;
