
const { createDeal, getDealById, updateDeal, removeDeal } = require('../models/dealModel');

const createDeals = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const { brandId, title, description, tagline, startDate, endDate, picture, banner } = req.body;
  if (!brandId) {
    return res.status(400).json({ message: "Brand Id is required" });
  } else if (!title) {
    return res.status(400).json({ message: "Tittle is required" });
  } else if (!description) {
    return res.status(400).json({ message: "Description is required" });
  } else if (!tagline) {
    return res.status(400).json({ message: "tagline is required" });
  } else if (!startDate) {
    return res.status(400).json({ message: "Start Date is required" });
  } else if (!endDate) {
    return res.status(400).json({ message: "End Date is required" });
  } else if (!picture) {
    return res.status(400).json({ message: "Picture is required" });
  }else if (!banner) {
    return res.status(400).json({ message: "Banner is required" });
  }
  try {
    await createDeal(brandId, title, description, tagline, startDate, endDate, picture, banner);
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

const getDeal = async (req, res) => {
  const { dealId } = req.body;
  if (!dealId) {
    return res.status(400).json({ message: "Deal Id is required" });
  }
  try {
    const deal = await getDealById(dealId);
    if (deal.length === 0) {
      return res.status(404).json({ message: "deal not found" });
    }
    res.status(200).json({ message: "Deal details", data: deal[0] });
  } catch (error) {
    res.status(500).json({ message: "Error to getting deal details", error: error.message });
  }
};

const editDeal = async (req, res) => {
  const { id, brandId, title, description, tagline, startDate, endDate, picture, banner } = req.body;
  if(!id) {
    return res.status(400).json({ message: "Id is required" });
  } else if (!brandId) {
    return res.status(400).json({ message: "Brand Id is required" });
  } else if (!title) {
    return res.status(400).json({ message: "Title is required" });
  } else if (!description) {
    return res.status(400).json({ message: "Description By is required" });
  } else if (!tagline) {
    return res.status(400).json({ message: "Tagline is required" });
  } else if (!startDate) {
    return res.status(400).json({ message: "Start Date is required" });
  } else if (!endDate) {
    return res.status(400).json({ message: "End Date is required" });
  } else if (!picture) {
    return res.status(400).json({ message: "Picture is required" });
  } else if (!banner) {
    return res.status(400).json({ message: "Banner is required" });
  }
  try {
    await updateDeal( id, brandId, title, description, tagline, startDate, endDate, picture, banner);
    res.status(200).json({ message: "Deal updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating Deal", error: error.message });
  }
};

const deleteDeal = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Deal Id is required" });
  }
  try {
    await removeDeal(id);
    res.status(200).json({ message: "Deal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error: error.message });
  }
};


module.exports = { deleteDeal, editDeal, getDeal, createDeals }