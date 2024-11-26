const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please fill out all the fields",
      });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      msg: "Registered Successully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please fill out all the fields",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    const isPassowrdMatched = await user.matchPassword(password);
    if (!isPassowrdMatched) {
      return res.status(404).json({
        success: false,
        msg: "Invalid Credentials",
      });
    }
    const token = user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      msg: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    return res.status(201).json({
      success: true,
      msg: "Logged in successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: new Date(0),
    });
    return res.status(201).json({
      success: true,
      msg: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id },
    }).sort({ createdAt: -1 });
    return res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
