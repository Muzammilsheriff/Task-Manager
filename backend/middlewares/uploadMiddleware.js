const multer = require("multer");
const path = require("path");

// multibel image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});



const fileFilter = (req, file, cb) => {
    const allwedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allwedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
