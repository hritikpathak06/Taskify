const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, msg: "Authentication token is missing" });
    }

    const decoded = jwt.verify(token, "ABAAHAJAKJOKAOKAOKLKA");
    console.log("decoded==>> ",decoded)
    req.user = decoded 

    next(); // Pass control to the next middleware/route
  } catch (error) {
    return res.status(401).json({ success: false, msg: "Invalid or expired token" });
  }
};
