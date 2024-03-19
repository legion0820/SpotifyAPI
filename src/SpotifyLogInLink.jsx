var client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID


//Source used to authenticate user: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile
export default function RedirectToAuthCodeFlow() {
    const params = new URLSearchParams();
    params.append("client_id", import.meta.env.VITE_SPOTIFY_CLIENT_ID);
    params.append("response_type", "code");
    params.append("redirect_uri", import.meta.env.VITE_OAUTH_REDIRECT_URL);
    params.append("scope", "user-read-private user-read-email user-top-read");

    // Redirect the user to Spotify's authorization page
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

