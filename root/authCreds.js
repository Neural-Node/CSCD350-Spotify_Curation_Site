
const charset ="abcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = () => {
    let text = "";
    for(var i = 0; i <= 16; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}


export const authCreds =
    {
        client_id: 'your_client_id',
        client_secret: 'your_client_secret',
        redirect_uri: 'http://localhost:3000',
        auth_endpoint: 'https://accounts.spotify.com/authorize',
    }