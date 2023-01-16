const express= require ('express');
const {createGenres, getGenres, updateGenres, deleteGenres} =require( '../controllers/genre.controller.js');
const {authenticate, authenticateMod } = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticateMod, createGenres);
router.get('/get', getGenres);
router.put('/update', authenticateMod, updateGenres);
router.delete('/delete', authenticateMod ,deleteGenres);

module.exports = router;