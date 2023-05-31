
//Creating a PKCE authorization flow with the creation of a code verifier. According to the PKCE
//standard, a code verifier is high-entropy cryptographic random string generator with
// a string between 43 and 128 characters
// Can contain letters, digits, underscores, periods
function generateRandomString(length){
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
}

// generate value using SHA256 algorithm
const digest = await window.crypto.subtle.digest('SHA-256',data);

//Once code verifier has been generated, we must transform (hash) it using the  SHA256 algorithm.
// This value will be sent within the user authorization request.
async function generateCodeChallenge(codeVerifier){
    function  base64encode(string){
        return btoa(String.fromCharCode().apply(null,new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEnvcoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256',data);

    return base64encode(digest);
}

//In order to request authorization from the user, we must make a GET request to the auhorize endpoint
//passing the same parameters as authorization code flow alone with two additional ones:
/*
*  code_challenge : Required. Set to the code challenge that your app calculated in previous step
*  code_challenge_method: Required. Set S256 */


//Code to request User Authorization

const clientID = "37105f8a5dea4697bc0953aa8220272c";
const redirectUri ='http://localhost:63342/CSCD350-Spotify_Curation_Site/root/menu.html?_ijt=k5detbbhsmij5qn0h6phbuuir0&_ij_reload=RELOAD_ON_SAVE';

let codeVerifier = generateRandomString(128);

generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';

    localStorage.setItem('code_verifier',codeVerifier);

    let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientID,
        scope: scope,
        redirect_uri: redirectUri,
        state:state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?'+ args;
});


// We must parse the URL and save the code parameter to request the access token afterwards:
const  urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');


//Once the user has accepted the request of the previous step, we can request access token by making
// a post request to the /api/token endpoint, with code and code verifier values.

let codeVerifier = localStorage.getItem('code_verifier');

let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri, redirectUri,
    client_id: clientID,
    code_verifier: codeVerifier
});

// Finally, we can make the POST request and store the access token by parsing the JSON response
// from the server

const response = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
})
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('access_token', data.access_token);
    })
    .catch(error => {
        console.error('Error:', error);
    });

//The following code implements the getProfile() function which performs the API call to the /me endpoint
// in order to retrieve the user profile and information:

let accessToken = localStorage.getItem('access_token');
async function getProfile(accessToken) {


    const response = await  fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    const data = await response.json();
}


