import React from 'react';
import PlayListItem from './PlayListItem';
import './PlayListList.css'

class PlayListList extends React.Component{
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {isExtended: false};
  }

  renderAction() {
    return this.state.isExtended === true ? '-' : '+';
  }

  toggleDropdown() {
    var newState = this.state.isExtended ? false : true;
    this.setState({isExtended: newState});
  }

  render() {
    var show = this.state.isExtended ? 'block' : 'none';
    let style = {display: show};
    return (
      <div className="Playlistlist" onClick={this.toggleDropdown}>
        <div className="controls">
          <p>My Playlists</p>
          <a className="controls-action">{this.renderAction()}</a>
        </div>
        <div className="items" style={style}>
          {
            this.props.playlists.map(playlist => {
              return (
                <PlayListItem key={playlist.id} playlist={playlist} onChoose={this.props.onChoose} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default PlayListList;
