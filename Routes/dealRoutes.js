const express = require("express");
const { createDeals, getDeal, editDeal, deleteDeal } = require("../controllers/dealController");
const router = express.Router();

router.post("/create", createDeals);
router.post("/get", getDeal);
router.put("/edit", editDeal);
router.delete("/delete", deleteDeal);

module.exports = router;