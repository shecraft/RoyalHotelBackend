const bcrypt = require("bcryptjs")
const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const sendVerificationEmail = require("../services/nodemailer/sendVerficationEmail")
const generateRandomString = require("../utils/randomStrings")


const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "Error",
        message: "Email already in use"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = generateRandomString(20);
    const tokenExpires = Date.now() + 5 * 60 * 1000;

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
      verificationTokenExpires: tokenExpires,
      isVerified: false
    });

    await sendVerificationEmail(email, name, token);

    return res.status(201).json({
      status: "Success",
      message: `Welcome ${user.name}, check your email to verify your account.`
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Server error"
    });
  }
};

const login = async (req, res) => {
    const {email, password}= req.body
    try {
        const user = await userModel.findOne({email})
         if (!user) {
            return res.status(400).json({
                status:"Error",
                message:"Email or Password Incorrect"
            })
         }

          if (!user.isVerified) {
           return res.status(401).json({
             status: "Error",
              message: "Please verify your email before logging in."
            });
          }

         const passwordcorrect = await bcrypt.compare(password, user.password)
         if (!passwordcorrect) {
            return res.status(400).json({
                status:"Error",
                message:"Email or Password Incorrect"
            })
         }

         const accessToken = jwt.sign({id: user._id, email: user.email},process.env.jwt_secret,{expiresIn:process.env.jwt_expires})

         return res.status(201).json({
            status:"Success",
            message: "Welcome back! Let the bookings begin.",
            accessToken
         })
    } catch (error) {
        console.log(error);
        
    }

}

module.exports = {
    register,
    login
}