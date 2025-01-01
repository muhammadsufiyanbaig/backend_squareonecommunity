const { createComplaint, getAllComplaint, updateComplaint, removeComplaint } = require("../models/supportModel");

const createComplaints = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const {title, message, status, userId} = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User Id is required" });
  } else if (!title) {
    return res.status(400).json({ message: "Tittle is required" });
  } else if (!message) {
    return res.status(400).json({ message: "Message is required" });
  } else if (status !== null) {
    return res.status(400).json({ message: "Status is required" });
  } 
  try {
    await createComplaint(title, message, status, userId);
    res.status(201).json({ message: "Complaint is successfully created" });
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

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await getAllComplaint();
    if (complaints.length === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ message: "All Complaints", data: complaints });
  } catch (error) {
    res.status(500).json({ message: "Error to getting all Complaints", error: error.message });
  }
};

const editComplaints = async (req, res) => {
  const {id, status } = req.body;
  if(!id) {
    return res.status(400).json({ message: "Id is required" });
  } else if (status !== null) {
    return res.status(400).json({ message: "Status is required" });
  } 
  try {
    await updateComplaint(id, status );
    res.status(200).json({ message: "Complaint updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating Deal", error: error.message });
  }
};

const deleteComplaint = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Complaint Id is required" });
  }
  try {
    await removeComplaint(id);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting complaint", error: error.message });
  }
};


module.exports = { editComplaints, deleteComplaint, getAllComplaints, createComplaints }