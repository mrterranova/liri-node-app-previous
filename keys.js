//require .env for passcodes
require ('dotenv').config();

where to import the keys and pass them to liri
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

