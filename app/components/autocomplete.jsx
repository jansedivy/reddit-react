var React = require('react');
var Reddit = require('../reddit');
var Spinner = require('../components/spinner');

var AutoComplete = React.createClass({
  getInitialState() {
    this.prevRequest = null;

    return {
      items: [],
      loading: false,
      value: ''
    };
  },

  getValue() {
    return this.state.value;
  },

  setValue(value) {
    this.setState({
      value: value
    });
  },

  onChange(event) {
    var value = event.target.value;

    this.setState({
      items: [],
      loading: true,
      value: value
    });

    if (this.prevRequest) {
      this.prevRequest = null;
    }

    var request = Reddit.findSubreddit(value).then((data) => {
      if (request === this.prevRequest) {
        this.setState({
          items: data,
          loading: false
        });
      }
    });

    this.prevRequest = request;
  },

  handleClick(item, e) {
    e.preventDefault();
    this.props.onInputSelect(item);
  },

  render() {
    return (
      <div className="autocomplete-field">
        <input autocapitalize="off" autocorrect="off" autoComplete="off" spellCheck="false" {...this.props} type="text" onChange={this.onChange} ref="input" value={this.state.value}/>
        {this.state.loading ? (
          <Spinner/>
        ) : (
          <ul className="autocomplete-list list">
            {this.state.items.map(item => <li key={item.id}><a href="#" onClick={this.handleClick.bind(this, item)}>{item.name}</a></li>)}
          </ul>
        )}
      </div>
    );
  }
});

module.exports = AutoComplete;
