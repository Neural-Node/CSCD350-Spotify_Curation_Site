// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQArYAtO2RNZQwYwZJM2JI59lhh8N_50SC16UygDTvpBu6dBh8ufhOFp2zYcQGbBv_Ij4Y9lQrDpVtvjP8djuItOqfSq5ouLWISZhSnO1tj6BGEnbKhQ1didVL5u3ee0kyw7RM1ZUieKlxTfhZT_77YbF9UwFl-x5DLP2nl8PgqpIoGQm9XoZK5-xwsS3kcrHZRWorLAkHkm2I-lYAZIDeX9QxVRibkDCtOssXy1tKJrFuGdUHNnXe8US_g1SBP-wBmtvLM';
async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body:JSON.stringify(body)
    });
    return await res.json();
}

const topTracksIds = [
    '7hZKIhk5IK6LIz7MQ0NW3L','4PwR7RS2gDDI5N0dWpsEWK','7BOSZVJ5D2fPRRQzanMRni','3kyixYInjLYTByq8EcJ2Yt','49X0LAl6faAusYq02PRAY6'
];

async function getRecommendations(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    return (await fetchWebApi(
        `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
    )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
    recommendedTracks.map(
        ({name, artists}) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
);