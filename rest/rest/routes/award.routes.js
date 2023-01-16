const express= require ('express');
const {createAward, getAwards, updateAward, deleteAward} =require( '../controllers/award.controller.js');
const {authenticate, authenticateAdmin, authenticateMod } = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticateMod, createAward);
router.get('/get', getAwards);
router.put('/update', authenticateMod, updateAward);
router.delete('/delete', authenticateMod ,deleteAward);

module.exports = router;