const Task = require("../models/taskModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Requires JWT token)

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Exclude password field

    // Add task counts to each other
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc, // Convert Mongoose document to plain object
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );
    res.json(usersWithTaskCounts);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (Requires JWT token)

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error){
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  getUsers,
  getUserById
};
