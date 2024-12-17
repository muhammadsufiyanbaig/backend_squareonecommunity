const express = require("express");
const {
  AdminSignUp,
  AdminLogin,
  getAdminProfile,
  editAdminProfile,
  deleteAdminProfile,
} = require("../controllers/adminAuthController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", AdminSignUp);
router.post("/login", AdminLogin);
router.post("/profile", authenticateToken, getAdminProfile);
router.put("/profile/edit", authenticateToken, editAdminProfile);
router.delete("/profile/delete", authenticateToken, deleteAdminProfile);

module.exports = router;
