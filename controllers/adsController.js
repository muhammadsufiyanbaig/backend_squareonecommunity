
const { removeAd, updateAd, getAds, insertAd } = require('../models/adsModel');

const createAd = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const {  banner, createdBy, brandId, dealId } = req.body;
  if (!banner) {
    return res.status(400).json({ message: "Banner is required" });
  } else if (!createdBy) {
    return res.status(400).json({ message: "Admin Id is required" });
  } else if (!brandId) {
    return res.status(400).json({ message: "Brand Id is required" });
  } else if (!dealId) {
    return res.status(400).json({ message: "Deal Id is required" });
  } 
  try {
    await insertAd(banner, createdBy, brandId, dealId) ;
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
  const { id, banner, createdBy, brandId, dealId} = req.body;
  if(!id) {
    return res.status(400).json({ message: "Ad Id is required" });
  } else if (!banner) {
    return res.status(400).json({ message: "Banner is required" });
  } else if (!createdBy) {
    return res.status(400).json({ message: "Admin Id is required" });
  } else if (!brandId) {
    return res.status(400).json({ message: "Brand Id By is required" });
  } else if (!dealId) {
    return res.status(400).json({ message: "Deal Id is required" });
  } 
  try {
    await updateAd(id, banner, createdBy, brandId, dealId);
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
    res.status(500).json({ message: "Error deleting ad", error: error.message });
  }
};


module.exports = { deleteAd, editAd, getAllAds, createAd }