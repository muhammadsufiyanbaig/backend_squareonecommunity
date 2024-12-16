const { createAdmin, getAdminByEmail, updateAdmin, deleteAdmin, getAdminById } = require("../models/adminModel");

const AdminSignUp = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const { fullName, email, Password } = req.body;

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
    res.status(200).json({ message: "Login successful", token, data: user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const getAdminProfile = async (req, res) => {
  const { id } = req.body;
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
    res.status(500).json({ message: "Error deleting profile", error: error.message });
  }
};


module.exports = {deleteAdminProfile, editAdminProfile, AdminLogin, AdminSignUp, getAdminProfile}