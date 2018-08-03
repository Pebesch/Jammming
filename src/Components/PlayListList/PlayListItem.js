import React from 'react';
import './PlayListItem.css';

class PlayListItem extends React.Component {
  constructor(props){
    super(props);
    this.loadPlaylist = this.loadPlaylist.bind(this);
  }

  loadPlaylist() {
    this.props.onChoose(this.props.playlist);
  }

  render() {
    return (
      <div className="item" onClick={this.loadPlaylist}>
        <img src={this.props.playlist.image.url} alt={this.props.playlist.name} />
        <a>{this.props.playlist.name}</a>
      </div>
    )
  }
}

export default PlayListItem;
