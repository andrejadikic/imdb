const express= require ('express');
const {createNews, getNews, updateNews, deleteNews} =require( '../controllers/news.controller.js');
const {authenticate, authenticateMod } = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticateMod, createNews);
router.get('/get', getNews);
router.put('/update', authenticateMod, updateNews);
router.delete('/delete', authenticateMod, deleteNews);

module.exports = router;