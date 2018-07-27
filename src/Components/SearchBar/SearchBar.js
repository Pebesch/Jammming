import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {term: ''};
  }

  search() {
    this.state.term === '' ? console.log('No term specified') : this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    var term = e.target.value;
    this.setState({term:term});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }

}

export default SearchBar;
