require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

let adminRoutes = require("./routes/adminRoutes");
let userRoutes = require("./routes/userRoutes");
let taskRoutes = require("./routes/taskRoutes");
let reportRoutes = require("./routes/reportRoutes");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to Handle Cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/report", reportRoutes)

// Serve uploads Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
