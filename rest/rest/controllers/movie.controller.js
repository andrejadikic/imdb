const {schemaMovie}  = require('../../common/joivalidate');
const { sequelize, Movie , Genre, Review, User} = require('../../models');

const getMovies = async (req, res) => {
  try {
    res.status(200).json(await Movie.findAll({
      include: [{ model: Genre, as: 'genre' }]
    }))
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const {id, title, genreName, imageUrl , description, rating } = req.body;

    const genre = await Genre.findOne({where:{name:genreName}});
    if(genre== null) throw new Error('Genre does not exists');
    const genreId = genre.id;

    const movie = { title, genreId ,description,rating,imageUrl};
    
    const validate = schemaMovie.validate(movie);
    if (validate.error) throw new Error( validate.error.details[0].message);
  
    await Movie.update(movie, { where: 
      {id}
    })
    .then(genre=>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const {id} = req.body;
    await Movie.destroy({
      where: {id}
    })
    .then(genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const {title, genreName, imageUrl , description, rating } = req.body;

    const genre = await Genre.findOne({where:{name:genreName}});
    if(genre== null) throw new Error('Genre does not exists');
    const genreId = genre.id;

    const movie = { title, genreId ,description,rating,imageUrl};
    
    const validate = schemaMovie.validate(movie);
    if (validate.error) throw new Error( validate.error.details[0].message);

    await Movie.create(movie).then( genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const review = async (req, res) => {
  try {
    const {movieId, anonimous, comment, rating} = req.body;
    const {userId, username} = req.locals;
    const moviee = await Movie.findOne({where:{id:movieId}});
    if(moviee == null) throw new Error('Movie does not exists');
    
    const review = {movieId, userId, username, comment,rating};
    if(anonimous==true){
      review.username="unknown";
    }
    const validate = schemaReview.validate(review);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingGenre = await Review.findOne({where: {
      [Op.and]: [
        { movieId: review.movieId },
        { userId: review.userId }
      ]
    }});
    if (existingGenre) throw new Error('Review already exists');
    console.log(anonimous);
    await Review.create(review).then( genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchMovies = async (req, res) => {
  try {
    const {searchText} = req.query;
    const entities = await Movie.findAll({
      where:{
        title: {
          [Op.like]: searchText
        }
      },
      include: [{ model: Genre, as: 'genre' }]
    }); // SELECT * FROM movies WHERE title LIKE searchText
    res.status(200).json(entities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyMovies = async (req, res) => {
  try {
    const {userId, username} = req.locals;
    const user = await User.findOne({where: { username }});
    // const movieIds = user.getReviews();
    const moviesId = (await user.getReviews({
      attributes: ['movieId'],
      raw: true
    })).map(movie => movie.movieId);
    console.log(moviesId);
    // const {searchText} = req.query;
    // const entities = await Movie.find({
    //   title: { $regex: `${searchText}`, $options: 'i' },
    // }); // SELECT * FROM movies WHERE title LIKE searchText
    res.status(200).json(await Movie.findAll({
      include: [{ model: Genre, as: 'genre' }]
    }))
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.searchMovies = searchMovies;
exports.reviewMovie = review;
exports.getMyMovies = getMyMovies;
exports.getMovies = getMovies;
exports.deleteMovie = deleteMovie;
exports.updateMovie = updateMovie;
exports.createMovie = createMovie;