const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTasks,
  deleteTask,
  getMyTasks,
  updateTaskStatus,
} = require("../controllers/taskController");
const router = express.Router();

router.route("/create").post(isAuthenticated, createTask);
router.route("/get-tasks").get(isAuthenticated, getAllTasks);
router.route("/single-task/:id").get(isAuthenticated, getSingleTask);
router.route("/single-task/:id").put(isAuthenticated, updateTasks);
router.route("/single-task/:id").delete(isAuthenticated, deleteTask);
router.route("/my-tasks").get(isAuthenticated, getMyTasks);
router.route("/update-task/:id").put(isAuthenticated, updateTaskStatus);

module.exports = router;
