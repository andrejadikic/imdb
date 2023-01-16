const {schemaGenre}  = require('../../common/joivalidate');
const { sequelize, Genre } = require('../../models');

const getGenres = async (req, res) => {
  try {
    res.status(200).json(await Genre.findAll())
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateGenres = async (req, res) => {
  try {
    //const { name, description } = req.body;
    const genre = req.body;
    
    const validate = schemaGenre.validate({name:genre.name,description:genre.description});
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingGenre = await Genre.findOne({where: {name:genre.name}});
    if (existingGenre) throw new Error('Genre already exists');
  
    
    await Genre.update(genre, { where: 
      {id:genre.id}
    })
    .then(genre=>{
      res.status(200).json(genre);
    })
    
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteGenres = async (req, res) => {
  try {
    const { name } = req.body;
    await Genre.destroy({
      where: {name}
    })
    .then(genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createGenres = async (req, res) => {
  try {
    const genre = req.body;
    
    const validate = schemaGenre.validate(genre);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingGenre = await Genre.findOne({where: {name:genre.name}});
    if (existingGenre) throw new Error('Genre already exists');

    await Genre.create(genre).then( genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.getGenres = getGenres;
exports.deleteGenres = deleteGenres;
exports.updateGenres = updateGenres;
exports.createGenres = createGenres;