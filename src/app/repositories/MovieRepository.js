const Movie = require('../models/Movie');

class MovieRepository{
  async findAll(){
    const movies = await Movie.find();
    return movies;
  }

  async findByName(name){
    const movie = await Movie.findOne({name});

    return movie;
  }

  async findById(id){
    let movie = await Movie.findById(id);

    return movie;
  }

  async create(body){
    let movie = new Movie(body);

    await movie.save();

    return movie;
  }

  async delete(id){
    const deleteOp = await Movie.findByIdAndDelete(id);
    return deleteOp;
  }

  async update(id, movie){
    let movieUpdated = await Movie.updateOne({_id: id}, movie);

    return movieUpdated;
  }
}

module.exports = new MovieRepository();