const express= require ('express');
const {createCelebrity, getCelebrities, updateCelebrity, deleteCelebrity} =require( '../controllers/celebrity.controller.js');
const {authenticate, authenticateMod } = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticateMod, createCelebrity);
router.get('/get', getCelebrities);
router.put('/update', authenticateMod, updateCelebrity);
router.delete('/delete', authenticateMod ,deleteCelebrity);

module.exports = router;