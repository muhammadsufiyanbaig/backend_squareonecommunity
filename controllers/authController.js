const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserByWhatsAppNo,
  updatePassword,
  storeOtp,
  verifyOtp,
  updateProfile,
  deleteProfileById,
} = require("../models/userModel");
const { sendOtpToWhatsApp } = require("../utils/otpService"); // Assume you have a utility to send OTP
const { isValidPhone, isValidDateOfBirth } = require("../utils/validator");

const SignUp = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const {
    fullName,
    whatsAppNo,
    Password,
    dateOfBirth,
    location,
    Gender,
    profileImage,
  } = req.body;
  try {
    if (!whatsAppNo) {
      return res.status(400).json({ message: "WhatsApp number is required" });
    } else if (!Password) {
      return res.status(400).json({ message: "Password is required" });
    } else if (!fullName) {
      return res.status(400).json({ message: "Full Name is required" });
    } else if (!dateOfBirth) {
      return res.status(400).json({ message: "Date of Birth is required" });
    } else if (!location) {
      return res.status(400).json({ message: "Location is required" });
    } else if (!Gender) {
      return res.status(400).json({ message: "Gender is required" });
    }
    if (!isValidPhone(whatsAppNo)) {
      return res.status(400).json({
        message: "Invalid WhatsApp number format",
        pattern: "+xx-xxxxxxxxxx",
      });
    }
    if (!isValidDateOfBirth(dateOfBirth)) {
      return res.status(400).json({
        message: "Invalid Date of Birth format",
        pattern: "dd-mm-yyyy",
      });
    }
    if (Gender !== "male" && Gender !== "female") {
      return res
        .status(400)
        .json({ message: "Gender must be either 'male' or 'female'" });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = await getUserByWhatsAppNo(whatsAppNo);
    if (user.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const LastLogin = new Date();
    await createUser(
      fullName,
      whatsAppNo,
      hashedPassword, // Ensure this matches the column name in your database
      dateOfBirth,
      location,
      Gender,
      LastLogin,
      profileImage
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
      stack: error.stack,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { whatsAppNo } = req.body;
  if (!whatsAppNo) {
    return res.status(400).json({ message: "WhatsApp number is required" });
  }
  
  if (!isValidPhone(whatsAppNo)) {
    return res.status(400).json({
      message: "Invalid WhatsApp number format",
      pattern: "+xx-xxxxxxxxxx",
    });
  }
  try {
    const user = await getUserByWhatsAppNo(whatsAppNo);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await storeOtp(whatsAppNo, otp);
    await sendOtpToWhatsApp(whatsAppNo, otp);
    res.status(200).json({ message: "OTP sent to WhatsApp" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
};

const newPassword = async (req, res) => {
  const { whatsAppNo, otp, newPassword } = req.body;
  if (!whatsAppNo) {
    return res.status(400).json({ message: "WhatsApp number is required" });
  } else if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  } else if (!newPassword) {
    return res.status(400).json({ message: "New password is required" });
  }

  if (!isValidPhone(whatsAppNo)) {
    return res.status(400).json({
      message: "Invalid WhatsApp number format",
      pattern: "+xx-xxxxxxxxxx",
    });
  }
  try {
    const isValidOtp = await verifyOtp(whatsAppNo, otp);
    if (!isValidOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updatePassword(whatsAppNo, hashedPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating password", error: error.message });
  }
};

const OTP_Verification = async (req, res) => {
  const { whatsAppNo, otp } = req.body;
  if (!whatsAppNo) {
    return res.status(400).json({ message: "WhatsApp number is required" });
  } else if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }
  if (!isValidPhone(whatsAppNo)) {
    return res.status(400).json({
      message: "Invalid WhatsApp number format",
      pattern: "+xx-xxxxxxxxxx",
    });
  }
  try {
    const isValidOtp = await verifyOtp(whatsAppNo, otp);
    if (!isValidOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

const Login = async (req, res) => {
  const { whatsAppNo, password } = req.body;
  if (!whatsAppNo) {
    return res.status(400).json({ message: "WhatsApp number is required" });
  } else if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!isValidPhone(whatsAppNo)) {
    return res.status(400).json({
      message: "Invalid WhatsApp number format",
      pattern: "+xx-xxxxxxxxxx",
    });
  }
  try {
    const user = await getUserByWhatsAppNo(whatsAppNo);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user[0].hashpassward);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });
    res.cookie("token", token);
    res.status(200).json({ message: "Login successful", token, data: user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const Logout = (req, res) => {
  // Clear the JWT token from the cookie
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

const getProfile = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await getUserById(id);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};

const editProfile = async (req, res) => {
  const { id, fullName, dateOfBirth, location, Gender, profileImage } = req.body;
  if (!fullName) {
    return res.status(400).json({ message: "Full Name is required" });
  } else if (!dateOfBirth) {
    return res.status(400).json({ message: "Date of Birth is required" });
  } else if (!location) {
    return res.status(400).json({ message: "Location is required" });
  } else if (!Gender) {
    return res.status(400).json({ message: "Gender is required" });
  } else if (!profileImage) {
    return res.status(400).json({ message: "Profile image is required" });
  } else if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  if (!isValidDateOfBirth(dateOfBirth)) {
    return res
      .status(400)
      .json({ message: "Invalid Date of Birth format", pattern: "dd-mm-yyyy" });
  }
  try {
    await updateProfile(id, fullName, dateOfBirth, location, Gender, profileImage);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

const deleteProfile = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    await deleteProfileById(id);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting profile", error: error.message });
  }
};

module.exports = {
  SignUp,
  forgotPassword,
  newPassword,
  OTP_Verification,
  Login,
  Logout,
  getProfile,
  editProfile,
  deleteProfile,
};
