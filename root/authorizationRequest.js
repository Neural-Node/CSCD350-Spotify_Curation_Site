//Following JavaScript creates and sends an Authorization request
var client_id = 'ClIENT_ID';
var client_secret ='CLIENT_SECRET';

var authOptions = {
    url: 'https://.accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic '+(new  Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions,function (error, response,body) {
    if (!error && response.statusCode === 200) {
        var token = body.access_token;
    }
});