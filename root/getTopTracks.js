// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDukrxOMEtuESoaZb_j_AaK-c8VAQ7NckwoLXS5fB-FJcBguWb_6sX5k3bC7HV0LNkwVZPDdrmGxiHyCcmhGKbbwD_XY63wFuhKnNtdtZQCMZK0d5V--PLT-z3bLGM2MyDfCPjBxEKXWU9eK-KEXZfMDDuScp3VIBM4Y7-wtQ0cxISan0EAGb7f8lIiGz4H7OxsXZ6AFBm5F9UJ1JHMjPkMu_1f81BXaBBXzHb-vPg46fMbmTAnhLUnS1MuVpZx6gHd0g_vzZNa3pxY0-WqnWrbCg';
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

async function getTopTracks(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
    )).items;
}

const topTracks = await getTopTracks();
console.log(
    topTracks?.map(
        ({name, artists}) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
);