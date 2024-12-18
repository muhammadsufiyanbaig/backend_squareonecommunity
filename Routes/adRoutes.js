const express = require("express");
const { createAd, getAllAds, editAd, deleteAd } = require("../controllers/adsController");
const router = express.Router();

router.post("/create", createAd);
router.post("/get", getAllAds);
router.put("/edit", editAd);
router.delete("/delete", deleteAd);

module.exports = router;