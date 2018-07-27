import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

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

let tracksChill = [
  {
    name: 'Three Little Birds',
    artist: 'Bob Marley',
    album: 'Birdy',
    id: 4
  },
  {
    name: 'Buffalo Soldier',
    artist: 'Bob Marley',
    album: 'Pew pew',
    id: 5
  },
  {
    name: 'No Woman No Cry',
    artist: 'Bob Marley',
    album: 'Cry clean',
    id: 6
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: tracks, playlistName: 'My super awsome playlist!', playlistTracks: tracksChill };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      console.log('Already added');
      return;
    }
    var newPlaylistTracks = this.state.playlistTracks.slice();
    newPlaylistTracks.push(track);
    this.setState({playlistTracks:newPlaylistTracks});
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      var newPlaylistTracks = this.state.playlistTracks.slice();
      newPlaylistTracks.splice(newPlaylistTracks.indexOf(track), 1);
      this.setState({playlistTracks:newPlaylistTracks});
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName:name});
  }

  savePlayList() {
    var URIArr = [];
    this.state.playlistTracks.forEach(track =>  {
      URIArr.push(`spotify:track:${track.id}`);
    });
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlayList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
