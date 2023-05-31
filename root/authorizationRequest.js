//Following JavaScript creates and sends an Authorization request
var client_id = '37105f8a5dea4697bc0953aa8220272c';
var client_secret ='c82bd04155fc489f9078f1c9dbfd0831';

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