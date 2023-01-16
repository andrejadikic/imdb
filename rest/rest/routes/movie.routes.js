const express= require ('express');
const {createMovie, getMovies, updateMovie, deleteMovie, getMyMovies,searchMovies,reviewMovie} =require( '../controllers/movie.controller.js');
const {authenticate, authenticateMod } = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticateMod, createMovie);
router.get('/get', getMovies);
router.put('/update', authenticateMod, updateMovie);
router.delete('/delete', authenticateMod ,deleteMovie);

router.get('/search', searchMovies);
router.get('/getMyMovies', authenticate, getMyMovies);
router.post('/review', authenticate, reviewMovie);


module.exports = router;