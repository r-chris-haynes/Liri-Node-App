# Liri-Node-App

LIRI is a Language Interpretation and Recognition Interface. This command line node app takes in parameters and gives you back data. 

To use this app the user needs run:   npm install   
  -They should do this from their terminal, and make sure they are inside the corresponding directory.
  -This will give them access to the node modules required to run the app.

To use this the user needs to supply their own .env file. They will also need to supply their own API keys from Spotify. 
    -To do this, create a file named .env, add the following to it, replacing the values with your API keys (no quotes) once you have them:
        # Spotify API keys
        SPOTIFY_ID=your-spotify-id
        SPOTIFY_SECRET=your-spotify-secret
    
The user has four categories they can search: 
    1. They can search the Bands In Town API to find out a favorite artist's next          concert.
    2. They can search the Spotify API to get information on a favorite song.
    3. They can search the OMDB API to find information on a favorite movie.
    4. They can pull from the random.txt file to run a Spotify song search of
       the text from that file.

Here are instructions on how to these searches:
    Type in one of the following four lines into your command line.
    node liri.js concert-this <artist/band name here>
    node liri.js spotify-this-song <song name here>
    node liri.js movie-this <movie name here>
    node liri.js do-what-it-says

    *These commands make API calls to retrieve the associated data that is displayed in the terminal


