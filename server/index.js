const express = require("express");
const connectDB = require("./db/conn");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

// Configs
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin:"https://taskify-d3qs.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes config
app.use("/api/v1", userRoute);
app.use("/api/v1/task", taskRoute);

const port = 8000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server running successfully on the port ${port}`);
});
