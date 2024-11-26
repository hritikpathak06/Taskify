const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      createdBy: req.user.id,
    });
    await task.save();
    res.status(201).json({
      success: true,
      msg: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "Error creating task",
      error: error.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 7, status, priority } = req.query;
    const query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const totalTasks = await Task.countDocuments(query);

    const totalPages = Math.ceil(totalTasks / limit);

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("assignedTo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        totalTasks,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error retrieving tasks",
      error: error.message,
    });
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo")
      .populate("createdBy");

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error retrieving task",
      error: error.message,
    });
  }
};

exports.updateTasks = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo } =
      req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority, status, assignedTo },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error updating task",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error deleting task",
      error: error.message,
    });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    });
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error deleting task",
      error: error.message,
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status: task.status === "Pending" ? "Completed" : "Pending" },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: `Task status updated to ${updatedTask.status}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error updating task status",
      error: error.message,
    });
  }
};
