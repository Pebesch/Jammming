let accessToken, expiresIn;
const redirectURI = 'http://localhost:3000/';
const clientID = '03ab43f6ef994bd9983d285284a7be44';
const searchBase = 'https://api.spotify.com/v1/';
const accessBase = 'https://accounts.spotify.com/authorize';


const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    } else {
      let tokenMatch = window.location.href.match(/access_token=([^&]*)/);
      let expireMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (tokenMatch && expireMatch) {
        accessToken = tokenMatch[1];
        expiresIn = parseInt(expireMatch[1], 10);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        let fallbackURL = `${accessBase}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        console.log(fallbackURL);
        window.location = fallbackURL;
      }
    }
  },

  search(term) {
    let token = this.getAccessToken();
    fetch(`${searchBase}search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
      return response.json()
    }).then(jsonResponse => {
      if(!jsonResponse.tracks){
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  }
}

export default Spotify;
