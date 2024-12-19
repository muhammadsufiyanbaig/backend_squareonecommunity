const express = require("express");
const {
  registerBrand,
  getBrand,
  editBrandDetails,
  deleteBrandDetails,
  getAllBrands,
} = require("../controllers/brandController");
const router = express.Router();

router.post("/create", registerBrand);
router.get("/all/get", getAllBrands);
router.post("/get", getBrand);
router.put("/edit", editBrandDetails);
router.delete("/delete", deleteBrandDetails);

module.exports = router;