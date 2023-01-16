const express= require ('express');
const {createRole, getRoles, updateRole, deleteRole} =require( '../controllers/moviecelebrity.controller.js');
const {authenticate, authenticateMod } = require('../../middleware/auth.middleware.js');

const router = express.Router();


router.post('/create', authenticateMod, createRole);
router.get('/get', getRoles);
router.put('/update', authenticateMod, updateRole);
router.delete('/delete', authenticateMod ,deleteRole);

module.exports = router;