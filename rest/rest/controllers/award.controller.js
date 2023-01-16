const {schemaGenre}  = require('../../common/joivalidate');
const { sequelize, Award } = require('../../models');

const getAwards = async (req, res) => {
  try {
    res.status(200).json(await Award.findAll())
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateAward = async (req, res) => {
  try {
    const award = req.body;
    
    const validate = schemaGenre.validate({name:award.name,description:award.description});
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingAward = await Award.findOne({where: {name:award.name}});
    if (existingAward) throw new Error('Award already exists');
  
    
    await Award.update(award, { where: 
      {id:award.id}
    })
    .then(award=>{
      res.status(200).json(award);
    })
    
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteAward = async (req, res) => {
  try {
    const { id } = req.body;
    await Award.destroy({
      where: {id}
    }).then(award =>{
      res.status(200).json(award);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createAward = async (req, res) => {
  try {
    const award = req.body;
    
    const validate = schemaGenre.validate(award);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingAward = await Award.findOne({where: {name:award.name}});
    if (existingAward) throw new Error('Award already exists');

    await Award.create(award).then( award =>{
      res.status(200).json(award);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.getAwards = getAwards;
exports.deleteAward = deleteAward;
exports.updateAward = updateAward;
exports.createAward = createAward;