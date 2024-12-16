const { SignUp, forgotPassword, newPassword, OTP_Verification, Login, Logout, getProfile, editProfile, deleteProfile } = require('../controllers/authController');
const express = require('express');
const router = express.Router();

router.post('/signup', SignUp);
router.post('/forgot-password', forgotPassword);
router.post('/new-password', newPassword);
router.post('/verify-otp', OTP_Verification);
router.post('/login', Login);
router.post('/logout', Logout);
router.get('/profile', getProfile);
router.put('/profile/edit', editProfile);
router.delete('/profile/delete', deleteProfile);

module.exports = router;