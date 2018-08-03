let accessToken;
const redirectURI = 'http://localhost:3000/';
const clientID = '03ab43f6ef994bd9983d285284a7be44';
const searchBase = 'https://api.spotify.com/v1/';
const accessBase = 'https://accounts.spotify.com/authorize';
let userId;


const Spotify = {
  getAccessToken() {
    // If there alreasy is a token return it.
    if (accessToken) {
      return accessToken;
    }
    // If not, if the date already is in the URL, fetch it.
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      //this.setAccessToken(accessToken, expiresIn);
      return accessToken;
    } else {
      // If not set and not in the url, get it from spotify.
      const fallbackURL = `${accessBase}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = fallbackURL;
    }
  },

  // Returns a header object
  getAuthorizationHeader() {
    const authheader = {
      Authorization: `Bearer ${this.getAccessToken()}`,
    }
    return authheader;
  },

/*
* Param: term => the search term
* Return: track => mapped track objects
*/
  search(term) {
    return fetch(`${searchBase}search?type=track&q=${term}`, {
      headers: this.getAuthorizationHeader()
    }).then(response => {
      return response.json()
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        image: track.album.images[2].url,
        preview_url: track.preview_url
      }));
    });
  },

  /*
  * Returns: jsonResponse.id => The user id uf the current user
  */
  getCurrentUserId() {
    if(userId) {
      return new Promise(
        resolve => resolve(userId),
      );
    } else {
      // Get user profile
      return fetch(`${searchBase}me`, {headers: this.getAuthorizationHeader()}
      ).then(response => response.json()
      ).then(jsonResponse => {
        userId = jsonResponse.id;
        return jsonResponse.id;
      })
    }
  },

  /*
  * Param: playlistName => Name of the new playlist
  * Param: trackUris => URI's of the track objects
  */
  savePlayList(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }
    return this.getCurrentUserId().then(() => {
      return fetch(`${searchBase}users/${userId}/playlists`, {
        // Create a new empty playlist on the user account
        headers: this.getAuthorizationHeader(),
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        // Save tracks to playlist
        const playlistId = jsonResponse.id;
        return fetch(`${searchBase}users/${userId}/playlists/${playlistId}/tracks`, {
          headers: this.getAuthorizationHeader(),
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  },

  /*
  * Returns: An array of playlist objects
  */
   getUserPlaylists() {
    return this.getCurrentUserId().then(() => {
      return fetch(`${searchBase}users/${userId}/playlists`, {headers: this.getAuthorizationHeader()}
      ).then(response => response.json()
      ).then(jsonResponse => {
        if(!jsonResponse.items){
          return [];
        }
        return jsonResponse.items.map(playlist => ({
          name: playlist.name,
          id: playlist.id,
          image: playlist.images[0]
        }));
      });
    });
  },

  /*
  * Params: id => The playlist id whose songs we want to display
  * Returns: An array of tracks
  */
  getPlaylist(id) {
    return this.getCurrentUserId().then(() => {
      return fetch(`${searchBase}users/${userId}/playlists/${id}/tracks`, {headers: this.getAuthorizationHeader()}
      ).then(response => response.json()
      ).then(jsonResponse => {
        if(!jsonResponse.items){
          return [];
        }
        return jsonResponse.items.map(item => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          uri: item.track.uri,
          image: item.track.album.images[2].url,
          preview_url: item.track.preview_url
        }));
      })
    });
  }
}

export default Spotify;
