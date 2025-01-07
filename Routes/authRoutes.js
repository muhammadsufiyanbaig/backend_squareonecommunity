const { SignUp, newPassword, Login, Logout, getProfile, editProfile, deleteProfile, getAllUsersForAdmin } = require('../controllers/authController');
const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', SignUp);
router.post('/new-password', newPassword);
router.post('/login', Login);
router.get('/logout',authenticateToken ,Logout);
router.post('/profile', authenticateToken,getProfile);
router.get('/allusers', getAllUsersForAdmin);
router.put('/profile/edit', editProfile);
router.delete('/profile/delete', authenticateToken, deleteProfile);

module.exports = router;