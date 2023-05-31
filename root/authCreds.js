
const charset ="abcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = () => {
    let text = "";
    for(var i = 0; i <= 16; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}


export const authCreds =
    {
        client_id: '37105f8a5dea4697bc0953aa8220272c',
        client_secret: 'c82bd04155fc489f9078f1c9dbfd0831',
        redirect_uri: 'http://localhost:63342/CSCD350-Spotify_Curation_Site/root/menu.html?_ijt=k5detbbhsmij5qn0h6phbuuir0&_ij_reload=RELOAD_ON_SAVE',
        auth_endpoint: 'https://accounts.spotify.com/authorize',
    }