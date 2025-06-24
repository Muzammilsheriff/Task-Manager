const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");
const { cloudinaryUpload } = require("../middlewares/cloudinaryUpload");
const { deleteImage } = require("../utils/cloudinaryUtils");

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login a user
router.get("/profile", protect, getUserProfile); // Get user profile
router.put("/profile", protect, updateUserProfile); // Update user profile

router.post("/upload-image", ...cloudinaryUpload("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        // Get the cloudinary result from the middleware
        const cloudinaryResult = req.cloudinaryResult;
        
        res.status(200).json({ 
            imageURL: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id, // Cloudinary public ID for potential deletion
            message: "Image uploaded successfully to Cloudinary"
        });
    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({ 
            message: "Failed to upload image", 
            error: error.message 
        });
    }
});

// Delete image from Cloudinary
router.delete("/delete-image/:publicId", protect, async (req, res) => {
    try {
        const { publicId } = req.params;
        
        if (!publicId) {
            return res.status(400).json({ message: "Public ID is required" });
        }
        
        const result = await deleteImage(publicId);
        
        if (result.result === 'ok') {
            res.status(200).json({ 
                message: "Image deleted successfully",
                result 
            });
        } else {
            res.status(400).json({ 
                message: "Failed to delete image",
                result 
            });
        }
    } catch (error) {
        console.error("Image deletion error:", error);
        res.status(500).json({ 
            message: "Failed to delete image", 
            error: error.message 
        });
    }
}); 

module.exports = router;
