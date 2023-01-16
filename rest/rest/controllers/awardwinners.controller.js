const {schemaWinner}  = require('../../common/joivalidate');
const { sequelize, AwardWinner, Celebrity, Award } = require('../../models');

const getWinners = async (req, res) => {
  try {
    res.status(200).json(await AwardWinner.findAll({
      include: [{ model: Award, as: 'award' },{ model: Celebrity, as: 'celebrity' }]
    }))
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateWinner = async (req, res) => {
  try {
    const {id, award, celeb, year} = req.body;

    const awardd = await Award.findOne({where:{name:award}});
    if(awardd== null) throw new Error('Award does not exists');
    const awardId = awardd.id;

    const celebrity = await Celebrity.findOne({where:{name:celeb}});
    if(celebrity== null) throw new Error('Celeb does not exists');
    const celebrityId = celebrity.id;

    const winner = {awardId,celebrityId,year};
    
    const validate = schemaWinner.validate(winner);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingWinner = await AwardWinner.findOne({where: {awardId,celebrityId,year}});
    if (existingWinner) throw new Error('AwardWinner already exists');
    
    await AwardWinner.update(winner, { where: 
      {id}
    })
    .then(winner=>{
      res.status(200).json(winner);
    })
    
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteWinner = async (req, res) => {
  try {
    const {id} = req.body;
    await AwardWinner.destroy({
      where: {id}
    })
    .then(winner =>{
      res.status(200).json(winner);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createWinner = async (req, res) => {
  try {
    const {award, celeb, year} = req.body;

    const awardd = await Award.findOne({where:{name:award}});
    if(awardd== null) throw new Error('Award does not exists');
    const awardId = awardd.id;

    const celebrity = await Celebrity.findOne({where:{name:celeb}});
    if(celebrity== null) throw new Error('Celeb does not exists');
    const celebrityId = celebrity.id;

    const winner = {awardId,celebrityId,year};
    
    const validate = schemaWinner.validate(winner);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingWinner = await AwardWinner.findOne({where: winner});
    if (existingWinner) throw new Error('AwardWinner already exists');

    await AwardWinner.create(winner).then( winner =>{
      res.status(200).json(winner);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.getWinners = getWinners;
exports.deleteWinner = deleteWinner;
exports.updateWinner = updateWinner;
exports.createWinner = createWinner;