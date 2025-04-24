const Task = require("../models/taskModel");
const User = require("../models/userModel");
const excel = require("exceljs");

// @desc  Export al tasks as Excel
// @route GET /api/report/export/tasks
// @access Private (Admin only)
const exportTaskReport = async (req, res) => {
  try {
    const task = await Task.find({}).populate("assignedTo", "name email");
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Report");

    worksheet.columns = [
    { header: "Task ID", key: "_id", width: 25 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "Due Date", key: "dueDate", width: 20 },
      { header: "Assigned To", key: "assignedTo", width: 30 }]


    task.forEach((task) => {
        const assignedTo = task.assignedTo
        .map((user) => user.name)
        .join(", ");
        worksheet.addRow({
            _id: task._id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate.toISOString().split("T")[0],
            assignedTo: assignedTo || "Unassigned",
        });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=tasks_report.xlsx`
    );

    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc  Export user-task report as an Excel file
// @route GET /api/report/export/users
// @access Private (Admin only)

const exportUserReport = async (req, res) => {
  try {
    const users = await User.find({}).select("name email _id").lean();
    const userTasks = await Task.find().populate("assignedTo", "name email _id")

    const userTaskMap ={};
    users.forEach((user) => {
        userTaskMap[user._id] = {
            name: user.name,
            email: user.email,
            taskCount :0,
            pendingTasks:0,
            completedTasks:0,
            inprogressTasks:0
        };
    });

    userTasks.forEach((task) => {
        if(task.assignedTo){
            task.assignedTo.forEach((user) => {
                if(userTaskMap[user._id]){
                    userTaskMap[user._id].taskCount +=1;
                    if(task.status === "Pending"){
                        userTaskMap[user._id].pendingTasks +=1;
                    }else if(task.status === "Completed"){
                        userTaskMap[user._id].completedTasks +=1;
                    }else if(task.status === "In Progress"){
                        userTaskMap[user._id].inprogressTasks +=1;
                    }
                }
            });
        }
    }
    );

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("User Task Report");

    worksheet.columns = [
        { header: "Name", key: "name", width: 30 },
        { header: "Email", key: "email", width: 30 },
        { header: "Total Tasks", key: "taskCount", width: 15 },
        { header: "Pending Tasks", key: "pendingTasks", width: 15 },
        { header: "Completed Tasks", key: "completedTasks", width: 20 },
        { header: "In Progress Tasks", key: "inprogressTasks", width: 20 },
    ];

    Object.values(userTaskMap).forEach((user) => {
        worksheet.addRow(user);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=users_report.xlsx`
    );

    return workbook.xlsx.write(res).then(() => {
        res.status(200).end();
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  exportTaskReport,
  exportUserReport,
};
