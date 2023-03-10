const mongoose = require('mongoose');

//To use this project, only change the url constant to your mongo database url.
const MONGO_CONNECTION_URL = 'mongodb://localhost:27017/newMovies';

async function connect(){
  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGO_CONNECTION_URL);
};

module.exports = connect;