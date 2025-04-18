const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login a user
router.get("/profile", protect, getUserProfile); // Get user profile
router.put("/profile", protect, updateUserProfile); // Update user profile

router.put("/upload-image", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageURL });
}); 

module.exports = router;
