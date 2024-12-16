
const { initializeDatabase } = require("./models/schema");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Initialize all tables
initializeDatabase();


// Routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });