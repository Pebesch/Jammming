import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {term: ''};
  }

  search() {
    this.state.term === '' ? console.log('No term specified') : this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    var term = e.target.value;
    this.setState({term:term});
  }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar" onKeyPress={this.handleKeyPress}>
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }

}

export default SearchBar;
