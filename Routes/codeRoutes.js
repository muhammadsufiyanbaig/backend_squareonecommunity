const express = require("express");
const { createCode, deleteCode } = require("../controllers/codeController");
const router = express.Router();

router.post("/create", createCode);
router.delete("/delete", deleteCode);

module.exports = router;