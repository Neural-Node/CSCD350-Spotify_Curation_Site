
/*
* The steps to implement the PKCE extension
*   1. A Spotify user visits our application and taps the login button.
*   2. The application makes a request to the authorization server.
*   3. The authorization server display a dialog asking the user to grant permissions to the application
*   4. Once teh user accepts the permissions, the authorization server redirects the user back to the application
*       which contains an authorization code.
*   5. The application requests an  access token ring use the code from the provided in the previous step.
*   6. Once received, the application uses the access token to make API calls.
*
*   TODO:
*       -Understand why PKCE flow is recommended over implicit grant flow.
*       -Implement the access token request.
*       -Make an API call to request Spotify user information.*/


/* Code Verifier
*      The PKCE authorization starts with the creation of the code verifier. According to the PKCE standard, a code
*       verfier is a high-entropy cryptographic random string with a length between 43 and 128 characters. It can
*       contain letters, digits, underscores, periods or tildes. */
function generateRandomString(length){
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
}


/*Code Challenge
*       Once the code verifier has been generated, we must hash it using the SHA256 algorithm. This is the value that will be
*       sent within the user authorization request. We aren't using node.js crypto libraries to generate the hash. Let's
*       use window.crypto.subtle.digest to generate the value using the SHA256 algorithm from the given data.
*        */
const digest = await window.crypto.subtle.digest('SHA-256',data);

/* The generateCodeChallenge function returns the base64 representation of the digest by calling to base64encode():*/
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

/* Request User Authorization
*       In order to request authorization from the user, we must make a GET request to the /authorize endpoint passing the
*       the same parameters as the authorization code flow does along with two additional ones.
*       *
*       Query Parameter         Value
*       ------------------------------------------------------------------------------------------------------------------------
*       client_id               Required. The Client ID generated after registering your application.
*       ------------------------------------------------------------------------------------------------------------------------
*       response_type           Required. Set to code.
*       ------------------------------------------------------------------------------------------------------------------------
*       redirect_uri            Required. The URI to redirect to after the user grants or denies permision. This URI needs
*                               your application. The value of redirect_uri here must exactly match one of the values you
*                               entered when you registered your application, including upper and lowercase, terminating slashes,
*                               and such.
*       ------------------------------------------------------------------------------------------------------------------------
*       state                   Optional, but strongly recommended. This provides protection against XS request forgery.
*       ------------------------------------------------------------------------------------------------------------------------
*       code_challenge_method   Required. Set to S256.
*       ------------------------------------------------------------------------------------------------------------------------
*       code_challenge          Required. Set the code challenge that your app calculated in the previous step.
*       ------------------------------------------------------------------------------------------------------------------------
*           */

// Request Authorization looks like this:
const clientID = "37105f8a5dea4697bc0953aa8220272c";
const redirectUri ='http://localhost:63342/CSCD350-Spotify_Curation_Site/root/menu.html';

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

/*The app generates a PKCE code challenge and redirects to the Spotify authorization server login  page by updating the
  window.location.object value, so the user can grant permissions to our application. Note how the code verifier
  value is  stored locally using the localStorage JavaScript property to be used in the next step of the authorization
  flow.

  Once the user accepts the requested permissions, the OAuth redirects the user back to the URL specified in the
  redirect_uri field. This callback contains two parameters within the URL:

  Query Parameter           Value
  code                      An authorization code that can be exchanged for an access token.
  -------------------------------------------------------------------------------------------------------------------
  state                     The value of the state parameter supplied in the request.
* */

// We must parse the URL and save the code parameter to request the access token afterwards:
const  urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

/*Request an Access token
*       Once the user has accepted the request of the previous step, we can request an access token by making a POST
*       request to the /api/token endpoint, with the code and the code verifier values.
*       The parameters are similar to authorization code flow, with two additional ones: client_id and code_verifier
*
*
*       REQUEST BODY
*       PARAMETER             VALUE
*       ---------------------------------------------------------------------------------------------------------------
*       grant_type             Required. This field must contain the value "authorization_code".
*       ---------------------------------------------------------------------------------------------------------------
*       code                   Required. The authorization code returned from the previous request.
*       ---------------------------------------------------------------------------------------------------------------
*       redirect_uri           Required. This parameter is used for validation only (There is no actual redirection).
*                              The value of this parameter must exactly match the value of redirect_uri supplied when
*                              requesting the authorization code.
*       ---------------------------------------------------------------------------------------------------------------
*       client_id              Required. The client ID of your app, available from the developer dashboard.
*       ---------------------------------------------------------------------------------------------------------------
*       code_verifier          Required. The value of this parameter must match the value of the code_verifier that your
*                              app generated in the previous step.*/

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

/*Once the site verifies the code verifier parameter sent in the request, it will return the access token. We can
* locally store the access token in order to make the API call by sending the Authorization header along with the
* value.
*
* The following code  implements the getProfile() function which performs the API call to the /me endpoint in order to
* retrieve the user profile related information:*/

async function getProfile(accessToken){
    let accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
    const  data = await response.json();
}

/*Refreshing the access token
*       In order to refresh the token, a POST request msust be sent with the following body parameters encoded in
*       application /x-www-form-urlencoded:
*
*       REQUEST BODY PARAMETER              VALUE
*       ---------------------------------------------------------------------------------------------------------------
*       grant_type                          Required. Set it refresh_token
*       ---------------------------------------------------------------------------------------------------------------
*       refresh_token                       Required. The refresh token returned from the authroization code exchange.
*       ----------------------------------------------------------------------------------------------------------------
*       client_id                           Required. The client ID for your app, available from the developer dashboard
*       ----------------------------------------------------------------------------------------------------------------
*
*
*       The headers of this POST request must contain the Content-Type set to application /x-www-form-urlencoded value.*/

