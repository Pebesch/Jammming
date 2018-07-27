let accessToken;
const redirectURI = 'http://localhost:3000/';
const clientID = '03ab43f6ef994bd9983d285284a7be44';
const searchBase = 'https://api.spotify.com/v1/';
const accessBase = 'https://accounts.spotify.com/authorize';


const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
    if(localStorage.getItem('spotify_token', '') !== '') {
      var expires = 0 + localStorage.getItem('spotify_expires', '0');
				if ((new Date()).getTime() > expires) {
					return '';
				}
      return localStorage.getItem('spotify_token', '');
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      this.setAccessToken(accessToken, expiresIn);
      return accessToken;
    } else  {
      const fallbackURL =`${accessBase}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = fallbackURL;
    }
  },

  setAccessToken(token, expires) {
    localStorage.setItem('spotify_token', token);
		localStorage.setItem('spotify_expires', (new Date()).getTime() + expires);
  },

  search(term) {
    let token = Spotify.getAccessToken();
    return fetch(`${searchBase}search?type=track&q=${term}`, {
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
