const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createAdmin, getAdminByEmail, updateAdmin, deleteAdmin, getAdminById } = require("../models/adminModel");
const { isValidEmail } = require('../utils/validator');

const AdminSignUp = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const { fullName, email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    } else if (!password) {
      return res.status(400).json({ message: "Password is required" });
    } else if (!fullName) {
      return res.status(400).json({ message: "Full Name is required" });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({message: "Invalid email format",});
    }
  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const admin = await getAdminByEmail(email);
    if (admin.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    await createAdmin(fullName, email, hashedPassword);
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating admin",
        error: error.message,
        stack: error.stack,
      });
  }
}; 

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  } else if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  
  try {
    const user = await getAdminByEmail(email);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user[0].hashpassward);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '72h' });
    
    res.cookie('token', token, { httpOnly: false, secure: false});
    res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const getAdminProfile = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Admin ID is required" });
  }
  try {
    const user = await getAdminById(id);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

const editAdminProfile = async (req, res) => {
  const { id, fullName, email, hashedPassword } = req.body;
  if (!fullName) {
    res.status(400).json({ message: "Full Name is required" }); 
  } else if (!email) {
    res.status(400).json({ message: "Email is required" });
  } else if (!hashedPassword) {
    res.status(400).json({ message: "Password is required" });
  }
  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({message: "Invalid email format",});
  }
  try {
    await updateAdmin(id, fullName,  email, hashedPassword);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

const deleteAdminProfile = async (req, res) => {
  const { id } = req.body;
  try {
    await deleteAdmin(id);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error: error.message });
  }
};


module.exports = {deleteAdminProfile, editAdminProfile, AdminLogin, AdminSignUp, getAdminProfile}