const {schemaReview}  = require('../../common/joivalidate');
const { sequelize, Review , Movie,User} = require('../../models');
const { Op } = require("sequelize");

const getReviews = async (req, res) => {
  try {
    res.status(200).json(await Review.findAll(
      {
        include: [{ model: Movie, as: 'movie' }]
      }
    ))
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const getMovieReviews = async (req, res) => {
  try {
    console.log(req.params.id);
    res.status(200).json(await Review.findAll({
      where:{movieId:req.params.id},
      include: [{ model: Movie, as: 'movie' }]
    }))
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const {id ,movie, username, comment,rating} = req.body;

    const moviee = await Movie.findOne({where:{title:movie}});
    if(moviee== null) throw new Error('Movie does not exists');
    const movieId = moviee.id;

    const userr = await User.findOne({where:{username}});
    if(userr== null) throw new Error('User does not exists');
    const userId = userr.id;

    const review = {movieId, userId, username, comment,rating};
    
    const validate = schemaReview.validate(review);
    if (validate.error) throw new Error( validate.error.details[0].message);
  
    await Review.update(review, { 
      where: {id}
    })
    .then(genre=>{
      res.status(200).json(genre);
    })
    
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const {id} = req.body;
    await Review.destroy({
      where: {id}
    })
    .then(genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const {movie, anonimous, comment, rating} = req.body;
    const {userId, userType, username} = req.locals;
    
    const moviee = await Movie.findOne({where:{title:movie}});
    if(moviee == null) throw new Error('Movie does not exists');
    const movieId = moviee.id;
    
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
    res.status(403).json({ message: error.message });
  }
};

exports.getMovieReviews = getMovieReviews;
exports.getReviews = getReviews;
exports.deleteReview = deleteReview;
exports.updateReview = updateReview;
exports.createReview = createReview;