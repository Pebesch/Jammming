import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.state = {isPlaying: false};
  }

  renderAction() {
    return this.props.isRemoval === true ? '-' : '+';
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  toggleAudio(e) {
    var audio = document.getElementById(`${this.props.track.id}_player`);
    if(!this.state.isPlaying){
      audio.play();
      this.setState({isPlaying: true});
    } else {
      audio.pause();
      this.setState({isPlaying: false});
    }
  }

  render() {
    let controls = this.state.isPlaying ? "fa-pause" : "fa-play";
    return (
      <div className="Track">
        <div className="Track-information vertical-flex">
          <div className="preview-container">
          {
            this.props.track.preview_url !== null &&
            <div onClick={this.toggleAudio}>
              <audio id={`${this.props.track.id}_player`} src={this.props.track.preview_url}> N/A</audio>
              <i className={`fas ${controls}`}></i>
            </div>
          }
          </div>
          <div className="img-container">
            <img src={this.props.track.image} alt={`${this.props.track.name} album cover`} />
          </div>
          <div>
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
        </div>
        <a className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.renderAction()}</a>
      </div>
    );
  }

}

export default Track;
