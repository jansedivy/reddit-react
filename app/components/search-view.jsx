var React = require('react');
var ListView = require('./list-view');
var Reddit = require('../reddit');

var SearchView = React.createClass({
  getInitialState() {
    return {
      searchItems: []
    };
  },

  handleSubmit(e) {
    e.preventDefault();

    var input = this.refs.search.getDOMNode().value.trim();

    Reddit.search(input).then((data) => this.setState({ searchItems: data }));

    this.refs.search.getDOMNode().value = '';
  },

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="search" ref="search"/>
          <input type="submit" value="Search"/>
        </form>

        <ListView items={this.state.searchItems}/>
      </div>
    );
  }
});

module.exports = SearchView;
