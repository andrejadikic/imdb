const {schemaGenre}  = require('../../common/joivalidate');
const { sequelize, Profession } = require('../../models');

const getProfessions = async (req, res) => {
  try {
    res.status(200).json(await Profession.findAll())
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const getAllCelebrityWithProfession = async(req,res)=>{
  try{
    let profession = await Profession.findByPk(req.params.id);
    return res.json(await profession.getCelebrities());
  } catch(error){
    res.status(403).json({ message: error.message });
  }
  
};

const updateProfession = async (req, res) => {
  try {
    //const { name, description } = req.body;
    const profession = req.body;
    
    
    
    const validate = schemaGenre.validate({name:profession.name,description:profession.description});
    if (validate.error) throw new Error( validate.error.details[0].message);
    // const existingProfession = await Profession.findOne({where: {name:profession.name}});
    // if (existingProfession) throw new Error('Profession already exists');
  
    console.log(profession);
    await Profession.update(profession, { where: 
      {id:profession.id}
    })
    .then(genre=>{
      res.status(200).json(genre);
    })
    
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteProfession = async (req, res) => {
  try {
    const { id } = req.body;
    await Profession.destroy({where: {id}})
    .then(genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createProfession = async (req, res) => {
  try {
    const profession = req.body;
    console.log(profession);
    const validate = schemaGenre.validate(profession);
    if (validate.error) throw new Error( validate.error.details[0].message);
    console.log(profession);
    const existingProfession = await Profession.findOne({where: {name:profession.name}});
    if (existingProfession) throw new Error('Profession already exists');
    
    await Profession.create(profession).then( profession =>{
      res.status(200).json(profession);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.getAllCelebrityWithProfession = getAllCelebrityWithProfession;
exports.getProfessions = getProfessions;
exports.deleteProfession = deleteProfession;
exports.updateProfession = updateProfession;
exports.createProfession = createProfession;