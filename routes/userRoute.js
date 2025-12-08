const express = require('express');
const router = express.Router();
const {getProfile, updateProfile, deleteAccount} = require('../controllers/userController');
const {authenticate} = require('../middleware/auth');
const {updateProfileValidation, validate} = require('../middleware/validation');  

// //All routes in this file require authentication
// router.use(authenticate);

// //@route GET /api/user/profile
// //@desc Get user profile
// //@access Private
// router.get('/profile', getProfile);

// //@route PUT /api/user/update
// //@desc Update user profile
// //@access Private
// router.put('/update', updateProfileValidation, validate, updateProfile);    

// //@route DELETE /api/user/delete
// //@desc Delete user account
// //@access Private
// router.delete('/delete', deleteAccount);

// module.exports = router;