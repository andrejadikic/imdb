const express= require ('express');
const {createWinner, getWinners, updateWinner, deleteWinner} =require( '../controllers/awardwinners.controller.js');
const {authenticate, authenticateAdmin , authenticateMod} = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticateMod, createWinner);
router.get('/get', getWinners);
router.put('/update', authenticateMod, updateWinner);
router.delete('/delete', authenticateMod ,deleteWinner);

module.exports = router;