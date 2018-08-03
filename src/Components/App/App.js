import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], playlistName: '', playlistTracks: [] };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  // Adds a track to current playlist
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      console.log('Already added');
      return;
    }
    var newPlaylistTracks = this.state.playlistTracks.slice();
    newPlaylistTracks.push(track);
    this.setState({playlistTracks:newPlaylistTracks});
  }

  // Removes a track from the current playlist
  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      var newPlaylistTracks = this.state.playlistTracks.slice();
      newPlaylistTracks.splice(newPlaylistTracks.indexOf(track), 1);
      this.setState({playlistTracks:newPlaylistTracks});
    }
  }

  // Changes the name of the current playlist
  updatePlaylistName(name) {
    this.setState({playlistName:name});
  }

  // Saves the playlist to Spotify
  savePlayList() {
    const URIArr = [];
    this.state.playlistTracks.forEach(track => {
      URIArr.push(`${track.uri}`);
    });
    Spotify.savePlayList(this.state.playlistName, URIArr);
  }

  // Searches spotify for the given term
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
