let accessToken;
let expiresIn;
const redirectURI = 'http://localhost:3000/';
const clientID = '03ab43f6ef994bd9983d285284a7be44';


const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
    let tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expireMatch = window.location.href.match(/expires_in=([^&]*)/);
    if(tokenMatch && expireMatch) {
      accessToken = tokenMatch[1];
      expiresIn = expireMatch[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }
    if(!(accessToken) !(tokenMatch) {
      fallbackURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = fallbackURL;
    }
  },
}

export default Spotify;
