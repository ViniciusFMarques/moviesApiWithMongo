const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {type: String, required: true},
  releaseYear: {type: Number, required: true},
  directors: {type: [String]},
  gender: {type: [String], required: true}
});

module.exports = mongoose.model('Movie', movieSchema);