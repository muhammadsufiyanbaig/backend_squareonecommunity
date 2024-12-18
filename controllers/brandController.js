
const { createBrand, getBrandById, updateBrand, deleteBrand } = require('../models/brandModel');

const registerBrand = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const { brandName, category, logoImage, createdBy, BrandWhatsAppNo, Description, WorkingHours } = req.body;
  if (!brandName) {
    return res.status(400).json({ message: "Brand Name is required" });
  } else if (!category) {
    return res.status(400).json({ message: "Category is required" });
  } else if (!logoImage) {
    return res.status(400).json({ message: "Logo Image is required" });
  } else if (!createdBy) {
    return res.status(400).json({ message: "Created By is required" });
  } else if (!BrandWhatsAppNo) {
    return res.status(400).json({ message: "Brand WhatsApp Number is required" });
  } else if (!Description) {
    return res.status(400).json({ message: "Description is required" });
  } else if (!WorkingHours) {
    return res.status(400).json({ message: "Working Hours is required" });
  }
  try {
    await createBrand(brandName, category, logoImage, createdBy, BrandWhatsAppNo, Description, WorkingHours);
    res.status(201).json({ message: "Brand register successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating brand",
        error: error.message,
        stack: error.stack,
      });
  }
}; 

const getBrand = async (req, res) => {
  const { brandId } = req.body;
  if (!brandId) {
    return res.status(400).json({ message: "Brand Id is required" });
  }
  try {
    const brand = await getBrandById(brandId);
    if (brand.length === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand details", data: brand[0] });
  } catch (error) {
    res.status(500).json({ message: "Error to getting brand details", error: error.message });
  }
};

const editBrandDetails = async (req, res) => {
  const { brandName, category, logoImage, createdBy, BrandWhatsAppNo, Description, WorkingHours } = req.body;
  if(!brandName) {
    return res.status(400).json({ message: "Brand Name is required" });
  } else if (!category) {
    return res.status(400).json({ message: "Category is required" });
  } else if (!logoImage) {
    return res.status(400).json({ message: "Logo Image is required" });
  } else if (!createdBy) {
    return res.status(400).json({ message: "Created By is required" });
  } else if (!BrandWhatsAppNo) {
    return res.status(400).json({ message: "Brand WhatsApp Number is required" });
  } else if (!Description) {
    return res.status(400).json({ message: "Description is required" });
  } else if (!WorkingHours) {
    return res.status(400).json({ message: "Working Hours is required" });
  }
  try {
    await updateBrand( brandName, category, logoImage, createdBy, BrandWhatsAppNo, Description, WorkingHours );
    res.status(200).json({ message: "Brand details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating brand details", error: error.message });
  }
};

const deleteBrandDetails = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Brand ID is required" });
  }
  try {
    await deleteBrand(id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error: error.message });
  }
};


module.exports = { deleteBrandDetails, editBrandDetails, getBrand, registerBrand }