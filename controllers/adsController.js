
const { removeAd, updateAd, getAds } = require('../models/adsModel');
const { createDeal, getDealById, updateDeal, removeDeal } = require('../models/dealModel');

const createAd = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const {  Banner, CreatedBy, BrandId, DealId } = req.body;
  if (!Banner) {
    return res.status(400).json({ message: "Brand Id is required" });
  } else if (!CreatedBy) {
    return res.status(400).json({ message: "Tittle is required" });
  } else if (!BrandId) {
    return res.status(400).json({ message: "Description is required" });
  } else if (!DealId) {
    return res.status(400).json({ message: "tagline is required" });
  } 
  try {
    await createDeal(brandId, title, description, tagline, startDate, endDate, Picture, Banner);
    res.status(201).json({ message: "Deal is successfully created" });
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

const getAllAds = async (req, res) => {
  try {
    const ads = await getAds(DealId);
    if (ads.length === 0) {
      return res.status(404).json({ message: "ad not found" });
    }
    res.status(200).json({ message: "All Ads", data: ads });
  } catch (error) {
    res.status(500).json({ message: "Error to getting Ads", error: error.message });
  }
};

const editAd = async (req, res) => {
  const { id, Banner, CreatedBy, BrandId, DealId} = req.body;
  if(!id) {
    return res.status(400).json({ message: "Id is required" });
  } else if (!Banner) {
    return res.status(400).json({ message: "Banner is required" });
  } else if (!CreatedBy) {
    return res.status(400).json({ message: "Admin Id is required" });
  } else if (!BrandId) {
    return res.status(400).json({ message: "Brand Id By is required" });
  } else if (!DealId) {
    return res.status(400).json({ message: "Deal Id is required" });
  } 
  try {
    await updateAd(id, Banner, CreatedBy, BrandId, DealId);
    res.status(200).json({ message: "Ad updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating Ad", error: error.message });
  }
};

const deleteAd = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Ad id is required" });
  }
  try {
    await removeAd(id);
    res.status(200).json({ message: "Ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error: error.message });
  }
};


module.exports = { deleteAd, editAd, getAllAds, createAd }