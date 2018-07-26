import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';

let tracks = [
  {
    name: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madam Across The Water',
    id: 1
  },
  {
    name: 'Penny Lane',
    artist: 'The Beatles',
    album: 'Penny Lane',
    id: 2
  },
  {
    name: 'Bohemiam Rapsody',
    artist: 'Queen',
    album: 'The Platinum Collection',
    id: 3
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: tracks };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <PlayList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
