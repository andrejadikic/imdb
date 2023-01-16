const Joi = require('joi');

const schemaUser = Joi.object().keys({
    username: Joi.string().min(5).required(),
    password: Joi.string()
      .min(8)
      .max(25)
      .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')).required(),
    email: Joi.string().email().required()
  });

  const schemaUserUpdate = Joi.object().keys({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    type: Joi.string().valid('ADMIN', 'MODERATOR','STANDARD', 'GHOST')
  });


const schemaGenre = Joi.object().keys({
    name: Joi.string().max(30).required(),
    description: Joi.string().max(100).allow('', null)
  });

const schemaWinner = Joi.object().keys({
  awardId: Joi.number().required(),
  celebrityId: Joi.number().required(),
  year: Joi.number().min(1500).max(2023).required()
});

const schemaCelebrity = Joi.object().keys({
  name: Joi.string().max(30).required(),
  education: Joi.string().max(100).allow('', null),
  professionId: Joi.number().required(),
  imageUrl: Joi.string().min(5)
});

const schemaEvent = Joi.object().keys({
  name: Joi.string().max(70).required(),
  location: Joi.string().max(100).required(),
  year: Joi.number().min(1500).max(2023).required()
});

const schemaMovie = Joi.object().keys({
  title: Joi.string().max(50).required(),
  description: Joi.string().max(300).allow('', null),
  rating: Joi.number().max(10),
  imageUrl: Joi.string().min(5),
  genreId: Joi.number().required()
});

const schemaRole = Joi.object().keys({
  role: Joi.string().max(30).required(),
  celebrityId: Joi.number().required(),
  movieId: Joi.number().required()
});

const schemaNews = Joi.object().keys({
  title: Joi.string().max(50).required(),
  text: Joi.string().min(10).max(1000).required(),
  author: Joi.string().max(100).required()
});

const schemaReview = Joi.object().keys({
  username: Joi.string().min(5).allow('', null),
  comment: Joi.string().min(10).max(100),
  rating: Joi.number().max(10).required(),
  userId: Joi.number().required(),
  movieId: Joi.number().required()
});

exports.schemaReview = schemaReview;
exports.schemaNews = schemaNews;
exports.schemaRole = schemaRole;
exports.schemaMovie = schemaMovie;
exports.schemaEvent = schemaEvent;
exports.schemaCelebrity = schemaCelebrity;
exports.schemaWinner = schemaWinner;
exports.schemaUser = schemaUser;
exports.schemaUserUpdate = schemaUserUpdate;
exports.schemaGenre = schemaGenre;