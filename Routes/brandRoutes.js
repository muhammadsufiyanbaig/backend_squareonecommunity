const express = require("express");
const {
  registerBrand,
  getBrand,
  editBrandDetails,
  deleteBrandDetails,
} = require("../controllers/brandController");
const router = express.Router();

router.post("/create", registerBrand);
router.post("/get", getBrand);
router.put("/edit", editBrandDetails);
router.delete("/delete", deleteBrandDetails);

module.exports = router;