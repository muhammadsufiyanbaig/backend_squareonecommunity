const { insertCode, removeCode, } = require("../models/codeModel");

const createCode = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const {code, userId, brandId, dealId} = req.body;
  if (!code) {
    return res.status(400).json({ message: "Code is required" });
  } else if (!userId) {
    return res.status(400).json({ message: "user Id is required" });
  } else if (!brandId) {
    return res.status(400).json({ message: "Brand Id is required" });
  } else if (!dealId) {
    return res.status(400).json({ message: "Deal Id is required" });
  } 
  try {
    await insertCode(code, userId, brandId, dealId);
    res.status(201).json({ message: "Code inserted is successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating code",
        error: error.message,
        stack: error.stack,
      });
  }
}; 

const deleteCode = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Code Id is required" });
  }
  try {
    await removeCode(id);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting code", error: error.message });
  }
};


module.exports = { createCode, deleteCode }