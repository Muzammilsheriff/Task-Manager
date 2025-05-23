const express = require("express");
const{protect, adminOnly} = require("../middlewares/authMiddleware");
const { exportUserReport, exportTaskReport } = require("../controllers/reportController");

const router = express.Router();


router.get("/export/tasks", protect, adminOnly, exportTaskReport);
router.get("/export/users", protect, adminOnly, exportUserReport);


module.exports = router;