const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskCheckList,
} = require("../controllers/taskController");

const router = express.Router();

// Task Management Routes
router.get("/dashboard-data", protect, getDashboardData); // Get dashboard data
router.get("/user-dashboard-data", protect, getUserDashboardData); // Get dashboard data
router.get("/", protect, getTasks); // Get all tasks
router.get("/:id", protect, getTasksById); // Get task by ID
router.post("/", protect, adminOnly, createTask); // Create a new task(Admin only)
router.put("/:id", protect, updateTask); // Update task by ID
router.delete("/:id", protect, adminOnly, deleteTask); // Delete task by ID (Admin only)
router.put("/:id/status", protect, updateTaskStatus); // Update task status by ID
router.put("/:id/todo", protect, updateTaskCheckList); // Update task tCheckList

module.exports = router;
