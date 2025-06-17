const express = require("express")
const { register, login } = require("../controllers/authController")
const userModel = require("../models/user"); 
const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)


authRouter.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const user = await userModel.findOne({ verificationToken: token });

    if (!user || user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ status: "Error", message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Server error" });
  }
});

module.exports = authRouter