const express= require ('express');
const {createEvent, getEvents, updateEvent, deleteEvent} =require( '../controllers/event.controller.js');
const {authenticate, authenticateMod } = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticateMod, createEvent);
router.get('/get', getEvents);
router.put('/update', authenticateMod, updateEvent);
router.delete('/delete', authenticateMod ,deleteEvent);

module.exports = router;