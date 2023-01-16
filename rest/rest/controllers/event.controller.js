const {schemaEvent}  = require('../../common/joivalidate');
const { sequelize, Event } = require('../../models');
const { Op } = require("sequelize");

const getEvents = async (req, res) => {
  try {
    res.status(200).json(await Event.findAll())
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const {id, name, location, year} = req.body;
    const event = {name, location, year}
    
    const validate = schemaEvent.validate(event);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingEvent = await Event.findOne({where: {
      [Op.and]: [
        { name: event.name },
        { location: event.location },
        { year: event.year }
      ]
    }});
    if (existingEvent) throw new Error('Event already exists');
  
    
    await Event.update(event, { where: {id}})
    .then(event=>{
      res.status(200).json(event);
    })
    
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { name } = req.body;
    await Event.destroy({
      where: {name}
    })
    .then(genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = req.body;
    
    const validate = schemaEvent.validate(event);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingEvent = await Event.findOne({where: {
      [Op.and]: [
        { name: event.name },
        { location: event.location },
        { year: event.year }
      ]
    }});
    if (existingEvent) throw new Error('Event already exists');

    await Event.create(event).then( genre =>{
      res.status(200).json(genre);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.getEvents = getEvents;
exports.deleteEvent = deleteEvent;
exports.updateEvent = updateEvent;
exports.createEvent = createEvent;