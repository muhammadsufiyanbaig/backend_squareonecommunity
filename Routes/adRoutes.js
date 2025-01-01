const express = require("express");
const { createAd, getAllAds, editAd, deleteAd, getRunningAds } = require("../controllers/adsController");
const router = express.Router();

router.post("/create", createAd);
router.get("/get", getAllAds);
router.get("/get/running", getRunningAds);
router.put("/edit", editAd);
router.delete("/delete", deleteAd);

module.exports = router;