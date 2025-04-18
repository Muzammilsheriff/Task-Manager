const Task = require("../models/taskModel");

// @desc    Get all tasks(Admin: all, Users: assigned to user)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profilePic"
      );
    } else {
      tasks = await Task.find({ assignedTo: req.user._id, ...filter }).populate(
        "assignedTo",
        "name email profilePic"
      );
    }

    // Add completed todoChecklist count to each task
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoCheckList.filter(
          (item) => item.Completed
        ).length;
        return {
          ...task._doc,
          completedTodoCount: completedCount,
        };
      })
    );

    // Status Summary counts
    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role === "admin" && { assignedTo: req.user._id }),
    });

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "In Progress",
      ...(req.user.role === "admin" && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role === "admin" && { assignedTo: req.user._id }),
    });

    res.status(200).json({
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTasksById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profilePic"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new task  (Admin only)
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoCheckList,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "AssignedTo must be an array of user ID's" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      attachments,
      todoCheckList,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update task details
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoCheckList = req.body.todoCheckList || task.todoCheckList;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "AssignedTo must be an array of user ID's" });
      }
      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete task (Admin only)
// @route   DELETE /api/tasks/:id
// @access  Private

const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update task checklist
// @route   PUT /api/tasks/:id/todo
// @access  Private
const updateTaskCheckList = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get dashboard data (Admin only)
// @route   GET /api/tasks/dashboard-data
// @access  Private

const getDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get dashboard data (User only)
// @route   GET /api/tasks/user-dashboard-data
// @access  Private

const getUserDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskCheckList,
  getDashboardData,
  getUserDashboardData,
};
