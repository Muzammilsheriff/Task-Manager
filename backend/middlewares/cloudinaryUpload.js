const multer = require("multer");
const cloudinary = require("../config/cloudinary");

// Configure memory storage for multer
const storage = multer.memoryStorage();

// File filter for allowed image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG and PNG are allowed."), false);
  }
};

// Multer upload configuration
const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Cloudinary upload function
const uploadToCloudinary = async (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "task-manager",
        public_id: `${Date.now()}_${originalname.split('.')[0]}`,
        allowed_formats: ["jpg", "jpeg", "png"],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

// Middleware to handle the actual cloudinary upload
const cloudinaryUpload = (fieldName) => {
  return [
    upload.single(fieldName),
    async (req, res, next) => {
      try {
        if (req.file) {
          const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
          req.cloudinaryResult = result;
          req.file.cloudinary = result;
        }
        next();
      } catch (error) {
        next(error);
      }
    }
  ];
};

module.exports = {
  upload,
  uploadToCloudinary,
  cloudinaryUpload
};