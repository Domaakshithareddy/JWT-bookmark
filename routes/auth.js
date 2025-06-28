const express = require('express');
const router  = express.Router();

const { signupUser,loginUser,refreshAccessToken,logoutUser }=require('../controllers/authController');
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/token',refreshAccessToken);
router.delete('/logout',logoutUser);

module.exports=router;