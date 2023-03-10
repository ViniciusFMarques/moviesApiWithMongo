const MovieRepository = require('../repositories/MovieRepository');

class MovieController{
  async index(request, response){
    const movies = await MovieRepository.findAll();

    let {orderBy} = request.query;

    orderBy = !orderBy ? 'ASC' : orderBy;

    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    if(direction === 'DESC'){
      const moviesOrdened = movies.sort((a, b) => b.releaseYear - a.releaseYear);
      return response.json(moviesOrdened);
    }else{
      const moviesOrdened = movies.sort((a, b) => a.releaseYear - b.releaseYear);
      return response.json(moviesOrdened);
    }
  }

  async show(request, response){
    const id = request.params.id;

    const movie = await MovieRepository.findById(id);

    if(!movie){
      return response.status(404).json({error: 'Movie not found'});
    };

    response.json(movie);
  }

  async store(request, response){
    const {body: movie} = request;
    const nameExists = await MovieRepository.findByName(movie.name);

    if(nameExists){
      return response.status(400).json({error: 'Movie already registred'});
    }

    if(!movie.name){
      return response.status(400).json({error: 'Name is required'});
    };
    if(!movie.releaseYear){
      return response.status(400).json({error: 'Release Year is required'});
    };
    if(!movie.gender){
      return response.status(400).json({error: 'At least one gender is required'});
    };

    const movieSaved = await MovieRepository.create(movie);
    response.json(movieSaved);

  }

  async delete(request, response){
    const {id} = request.params;

    await MovieRepository.delete(id);

    response.sendStatus(204);
  }

  async update(request, response){
    const {id} = request.params;
    const {body: movie} = request;

    const movieExists = await MovieRepository.findById(id);

    if(!movieExists){
      return response.status(404).json({error: 'Movie not found'});
    };
    if(!movie.name){
      return response.status(400).json({error: 'Name is required'});
    };
    if(!movie.releaseYear){
      return response.status(400).json({error: 'Release Year is required'});
    };
    if(!movie.gender){
      return response.status(400).json({error: 'At least one gender is required'});
    };

    await MovieRepository.update(id, movie);

    const updatedMovie = await MovieRepository.findById(id);

    response.json(updatedMovie);
  }
}

module.exports = new MovieController();