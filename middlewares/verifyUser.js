const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "Error", message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.jwt_secret);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ status: "Error", message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
      console.log("Decoded user ID:", decoded.id);
      console.log("User found:", user);

  } catch (error) {
    console.error(error);
    res.status(401).json({ status: "Error", message: "Invalid or expired token" });
  }
};

module.exports = verifyUser;
