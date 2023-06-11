# CSCD350-Spotify_Curation_Site
This repository is for the Group Project for Team 6 for EWU Spring CSCD350

# User Manual

## View our webpage here: https://neural-node.github.io/CSCD350-Spotify_Curation_Site/ 

### **Description**
   The system is meant to create a playlist based on user inputs and what their listening habits are. Using the Spotify API the user should be able to login and view their profile data and create a playlist that they can then add to their existing spotify account. 
   
   Users spend a great deal of time sifting through different music genres or moods to only be bombarded with millions of options of music, some of which may not actually pertain to their keyword used in the search. We have made a website that helps cut down the time of searching. No more getting music that doesn’t actually fit the mood you want to vibe too. Our website curates the music to actually match what you're searching for.
Using the Spotify API we can search for music based on energy level, genre, and recently listened to songs. These filters were meant to be used to curate an enjoyable playlist designed around the user’s specifications. The user can then choose if they wish to have the playlist added to their Spotify account and they can then listen to it on Spotify. This is purely a playlist curation website, users should not be able to listen to more than a short preview of a song on this website.


### **Installation**
   This project requires no installation. However, it does require the user to already have a Spotify account. This can be created for free here:

<p align="center">
https://www.spotify.com/us/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F 
</p>
	
   Ideally the user will have listened to enough music on the account for the Spotify API to pull data about their currently listened to music tastes.


### **Running the Software**
   Clone/fork the main branch in the GitHub or download the code.For the code to work you will need to create your own client-id. In whatever IDE you are working in, go to the scripts/src folder and open the script.js file. At the top there will be a const clientId variable. You will need to replace the your-client-id-here with your actual client-id.

![clientId here picture](https://github.com/Neural-Node/CSCD350-Spotify_Curation_Site/assets/97580466/a34e1e1d-93cf-4035-b105-57162393eeb1)

To get this clientId go to this link: https://developer.spotify.com/ 

You will want to login in with your Spotify account with the button in the top right corner. After you are logged in click on your username in the top right corner and click “Dashboard” from the drop down menu. 

![Dashboard Image](https://github.com/Neural-Node/CSCD350-Spotify_Curation_Site/assets/97580466/1be07201-c753-4136-b2f9-d00952cb07fa)

From here click on either of the “Create App” buttons. You will be asked for an App Name and App Description. It doesn’t really matter what these are. For the Website and Redirect URI, put “CSCD350/Spotify_Curation_Project/index.html” and add a “/callback” to the end of the redirect. It should look something like this:

![Create App Image](https://github.com/Neural-Node/CSCD350-Spotify_Curation_Site/assets/97580466/0caba515-dba3-4dbd-8651-5d5bf3846d44)

After everything is filled out press save.

Now, in the Basic Information section, the app should give you a Client ID that you can copy and paste into the const clientId variable in the script.js file. 

   There is one other place where the data in the Basic Information section of the app is needed. This is a script function in the same script.js file. In the function requestAuthorization() you will need to put in your own client_id and client_secret inside the “quotation marks”. Both of these can be found in the Basic Information tab of the Spotify App Dashboard. 

![requestAuthorization function](https://github.com/Neural-Node/CSCD350-Spotify_Curation_Site/assets/97580466/9390f3b6-3a14-42c9-9ea5-f637710a8a5d)
![ID and secret variables](https://github.com/Neural-Node/CSCD350-Spotify_Curation_Site/assets/97580466/f8e919bf-4528-4abf-85b4-b4a2cd86420d)


### **How to Use the Software**
   After the client-id and client-secret has been put into the code you can view index.html as a web page. From here you can click the Login with Spotify button to login with your Spotify account. Unfortunately, we haven’t gotten the callback to work yet so currently it will display an error message after signing in with your Spotify account. If you would like to see a hardcoded demo of what the site should look like/do feel free to pull up the code from the Hardcode-Test branch, where the buttons are just links to the other pages.
Ideally, with full functionality, you would use the site by using your Spotify account credentials (password and email/username). 


![Website Login Page](https://cdn.discordapp.com/attachments/1101196273236844645/1117277786369953832/Screenshot_2023-06-10_183751.png)
![Spotify Login](https://cdn.discordapp.com/attachments/1101196273236844645/1117277786097332254/Screenshot_2023-06-10_183832.png)


From here you will be taken to our homepage which contains a slider for the mood energy level. It also has the option to select by genre or top 5 artists. This will generate a playlist of suggestions based on your selection. 


![Home Page](https://github.com/Neural-Node/CSCD350-Spotify_Curation_Site/assets/97580466/8f73e24d-3d01-4e54-9e2c-9d95c9cbe04c)


When you click the view playlist button it’ll display that playlist which was generated. From this point you may create the playlist to your spotify account. The playlist generated on our curation site will display the album art, song title, artists, song duration, and a play preview. 


![Playlist Display](https://github.com/Neural-Node/CSCD350-Spotify_Curation_Site/assets/97580466/b191d869-2ca1-4b75-a6ed-726a58935d1b)
![Header](https://github.com/Neural-Node/CSCD350-Spotify_Curation_Site/assets/97580466/464b79e5-d107-4899-a9d3-9ef9cbc42ea9)


On the homepage after logging in, on the top of the page, there is a button titled “Your Profile” which will take you to a new page that displays your account information in fields such as; User ID, Email, Spotify URI, the link to your Spotify profile, and your profiles image.  


![Profile Data](https://github.com/Neural-Node/CSCD350-Spotify_Curation_Site/assets/97580466/4361d826-8955-4fa0-9943-1c7690ff8736)


On this same page you can click the home button to return to the main page and logout.
