const express = require('express');
const { AdminSignUp, AdminLogin, getAdminProfile, editAdminProfile, deleteAdminProfile } = require('../controllers/adminAuthController');
const router = express.Router();

router.post('/signup', AdminSignUp);
router.post('/login', AdminLogin);
router.get('/profile', getAdminProfile);
router.put('/profile/edit', editAdminProfile);
router.delete('/profile/delete', deleteAdminProfile);

module.exports = router;