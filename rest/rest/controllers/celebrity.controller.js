const {schemaCelebrity}  = require('../../common/joivalidate');
const { sequelize, Celebrity , Profession} = require('../../models');

const getCelebrities = async (req, res) => {
  try {
    res.status(200).json(await Celebrity.findAll({
        // attributes: ['id','name','education'],
        include: [{ model: Profession, as: 'profession' }]
      }));





  //   res.status(200).json(await Celebrity.findAll({
  //     raw: true,
  //     include: [{
  //     model: Profession,
  //     required: false,
  //     as: 'profession',
  //     attributes:  ['name']
  // }]}));


    

    // res.status(200).json(await Celebrity.findAll({
    //   raw:true,
    //   attributes: {
    //   include: [sequelize.col('profession.name'), 'profession']
    //   },
    //       include: [{
    //           model: Profession,
    //           required: true,
    //           as: 'profession',
    //           attributes: []
    //       }]
    //   }));
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateCelebrity = async (req, res) => {
  try {
    const {id, name, education, imageUrl , professionName } = req.body;

    const prof = await Profession.findOne({where:{name:professionName}});
    if(prof== null) throw new Error('Profession does not exists');
    const professionId = prof.id;

    const celebrity = { name, education, imageUrl , professionId };
    const validate = schemaCelebrity.validate(celebrity);
    if (validate.error) throw new Error( validate.error.details[0].message);

    await Celebrity.update(celebrity, { where: {id}})
    .then(celebrity=>{
      res.status(200).json(celebrity);
    })
    
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteCelebrity = async (req, res) => {
  try {
    const { id } = req.body;
    await Celebrity.destroy({ where: {id} })
    .then(celeb =>{
      res.status(200).json(celeb);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createCelebrity = async (req, res) => {
  try {
    const {name, education, imageUrl , professionName } = req.body;

    const prof = await Profession.findOne({where:{name:professionName}});
    if(prof== null) throw new Error('Profession does not exists');
    const professionId = prof.id;


    const celebrity = { name, education, imageUrl , professionId };
    const validate = schemaCelebrity.validate(celebrity);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingGenre = await Celebrity.findOne({where: {name,education,professionId}});
    if (existingGenre) throw new Error('Celebrity already exists');


    await Celebrity.create(celebrity).then( celeb =>{
      res.status(200).json(celeb);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.getCelebrities = getCelebrities;
exports.deleteCelebrity = deleteCelebrity;
exports.updateCelebrity = updateCelebrity;
exports.createCelebrity = createCelebrity;