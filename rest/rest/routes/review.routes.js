const express= require ('express');
const {createReview, getReviews, updateReview, deleteReview, getMovieReviews} =require( '../controllers/review.controller.js');
const {authenticate, authenticateAdmin } = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticate, createReview);
router.get('/get', getReviews);
router.get('/:id', getMovieReviews);
router.put('/update', authenticate, updateReview);
router.delete('/delete', authenticate ,deleteReview);

module.exports = router;