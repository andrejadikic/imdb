const {schemaRole}  = require('../../common/joivalidate');
const { sequelize, MovieCelebrity, Movie, Celebrity } = require('../../models');
const { Op } = require("sequelize");

const getRoles = async (req, res) => {
  try {
    res.status(200).json(await MovieCelebrity.findAll({
      include: [{ model: Movie, as: 'movie' },{ model: Celebrity, as: 'celebrity' }]
    }))
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const {id, movie, celeb, role} = req.body;

    const moviee = await Movie.findOne({where:{title:movie}});
    if(moviee== null) throw new Error('Movie does not exists');
    const movieId = moviee.id;

    const celebrity = await Celebrity.findOne({where:{name:celeb}});
    if(celebrity== null) throw new Error('Celeb does not exists');
    const celebrityId = celebrity.id;

    const rolee = { role, movieId ,celebrityId};
    const validate = schemaRole.validate(rolee);
    if (validate.error) throw new Error( validate.error.details[0].message);
    
    await MovieCelebrity.update(rolee, { where: 
      {id}
    })
    .then(genre=>{
      res.status(200).json(genre);
    })
    
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.body;
    await MovieCelebrity.destroy({
      where: {id}
    })
    .then(genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createRole = async (req, res) => {
  try {
    const {movie, celeb, role} = req.body;

    const moviee = await Movie.findOne({where:{title:movie}});
    if(moviee== null) throw new Error('Movie does not exists');
    const movieId = moviee.id;

    const celebrity = await Celebrity.findOne({where:{name:celeb}});
    if(celebrity== null) throw new Error('Celeb does not exists');
    const celebrityId = celebrity.id;

    const rolee = { role, movieId ,celebrityId};
    const validate = schemaRole.validate(rolee);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingRole = await MovieCelebrity.findOne({
      where: {
        [Op.and]: [
          { movieId: rolee.movieId },
          { celebrityId: rolee.celebrityId }
        ]
      }
      });
    if (existingRole) throw new Error('Role already exists');

    await MovieCelebrity.create(rolee).then( genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.getRoles = getRoles;
exports.deleteRole = deleteRole;
exports.updateRole = updateRole;
exports.createRole = createRole;