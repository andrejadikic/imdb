const express= require ('express');
const {createProfession, getProfessions, updateProfession, deleteProfession, getAllCelebrityWithProfession} =require( '../controllers/profession.controller.js');
const {authenticate, authenticateMod } = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticateMod, createProfession);
router.get('/', getProfessions);
router.get("/:id", getAllCelebrityWithProfession);
router.put('/update', authenticateMod, updateProfession);
router.delete('/delete', authenticateMod ,deleteProfession);

module.exports = router;