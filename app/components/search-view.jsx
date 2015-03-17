var React = require('react');
var ListView = require('./list-view');
var Reddit = require('../reddit');

var SearchView = React.createClass({
  getInitialState() {
    return {
      searchItems: [],
      searchQuery: ''
    };
  },

  handleSubmit(e) {
    e.preventDefault();

    var input = this.refs.search.getDOMNode().value.trim();

    Reddit.search(input).then((data) => this.setState({ searchItems: data }));

    this.setState({
      searchQuery: input
    });

    this.refs.search.getDOMNode().value = '';
  },

  render() {
    return (
      <div>
        <h1>Searching for: {this.state.searchQuery}</h1>
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
