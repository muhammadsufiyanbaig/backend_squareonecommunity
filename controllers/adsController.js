const { 
  removeAd, 
  updateAd, 
  getAds, 
  insertAd, 
  getRunningAdsToday 
} = require('../models/adsModel');

const createAd = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const { banner, createdBy, brandId, dealId, startAt, endAt } = req.body;
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
    await insertAd(banner, createdBy, brandId, dealId, startAt, endAt);
    res.status(201).json({ message: "Ad is successfully created" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating ad",
      error: error.message,
      stack: error.stack,
    });
  }
};

const getAllAds = async (req, res) => {
  try {
    const ads = await getAds();
    if (ads.length === 0) {
      return res.status(404).json({ message: "No ads found" });
    }
    res.status(200).json({ message: "All Ads", data: ads });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ads", error: error.message });
  }
};

const getRunningAds = async (req, res) => {
  try {
    const ads = await getRunningAdsToday();
    if (ads.length === 0) {
      return res.status(404).json({ message: "No running ads today" });
    }
    res.status(200).json({ message: "Running Ads Today", data: ads });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving running ads", error: error.message });
  }
};

const editAd = async (req, res) => {
  const { id, banner, createdBy, brandId, dealId, startAt, endAt } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Ad Id is required" });
  }
  try {
    await updateAd(id, banner, createdBy, brandId, dealId, startAt, endAt);
    res.status(200).json({ message: "Ad updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating ad", error: error.message });
  }
};

const deleteAd = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Ad Id is required" });
  }
  try {
    await removeAd(id);
    res.status(200).json({ message: "Ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ad", error: error.message });
  }
};

module.exports = { deleteAd, editAd, getAllAds, createAd, getRunningAds };
