const express= require ('express');
const {getUsers, deleteUsers, updateUsers,getProfile,updateProfile} =require( '../controllers/user.controller.js');
const {authenticate, authenticateAdmin} = require('../../middleware/auth.middleware.js');

const router = express.Router();
router.get('/get', authenticateAdmin, getUsers);
router.delete('/delete', authenticateAdmin, deleteUsers);
router.put('/update', authenticateAdmin, updateUsers);

router.get('/getProfile', authenticate, getProfile);
router.put('/updateProfile', authenticate, updateProfile);



module.exports = router;