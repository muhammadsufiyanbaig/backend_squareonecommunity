const { createAdmin, getAdminByEmail } = require("../models/adminModel");

const AdminRegister = async (req, res) => {
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
