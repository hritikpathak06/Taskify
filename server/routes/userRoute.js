const express = require("express");
const {
  registerUser,
  loginUser,
  getMyProfile,
  logoutUser,
  getAllUsers,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/logout").get(logoutUser);
router.route("/users").get(isAuthenticated, getAllUsers);

module.exports = router;
