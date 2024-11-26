const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://phritik06:zfXJ65SNiZoXhayt@eccom.zqrt7ny.mongodb.net/Taskify?retryWrites=true&w=majority"
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = connectDB;
