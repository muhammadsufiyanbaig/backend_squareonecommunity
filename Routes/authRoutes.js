const { SignUp, forgotPassword, newPassword, OTP_Verification, Login, Logout, getProfile, editProfile, deleteProfile } = require('../controllers/authController');
const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', SignUp);
router.post('/forgot-password', forgotPassword);
router.post('/new-password', newPassword);
router.post('/verify-otp', OTP_Verification);
router.post('/login', Login);
router.get('/logout',authenticateToken ,Logout);
router.post('/profile', authenticateToken,getProfile);
router.put('/profile/edit', authenticateToken,editProfile);
router.delete('/profile/delete', authenticateToken, deleteProfile);

module.exports = router;