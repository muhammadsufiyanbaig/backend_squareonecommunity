const cluster = require("cluster");
const os = require("os");
const { initializeDatabase } = require("./models/schema");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/authRoutes");
const adminAuthRoutes = require("./Routes/adminAuthRoutes");
const brandRoutes = require("./Routes/brandRoutes");
const dealRoutes = require("./Routes/dealRoutes");
const adRoutes = require("./Routes/adRoutes");
const supportRoutes = require("./Routes/supportRoutes");
const codeRoutes = require("./Routes/codeRoutes");
const eventRoutes = require("./Routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://squareonecommunity.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE" , "OPTIONS" , "PATCH", "HEAD" , "CONNECT"], // Add other methods as needed
    allowedHeaders: ["Content-Type", "Authorization" , "Access-Control-Allow-Origin"],
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
app.use("/auth", authRoutes);
app.use("/admin/auth", adminAuthRoutes);
app.use("/brand", brandRoutes);
app.use("/deal", dealRoutes);
app.use("/ad", adRoutes);
app.use("/support", supportRoutes);
app.use("/code", codeRoutes);
app.use("/event", eventRoutes);

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Number of CPUs is ${numCPUs}`);
  
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart the worker
  });
} else {
  // Workers can share any TCP connection
  // In this case, it is an HTTP server
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started`);
  });
}

module.exports = app;
