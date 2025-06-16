const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
          type:String
    },
    email:{
        type:String,
        required:true,
        unique:[true, "Email already exist"]
    },
    password:{
       type:String
    },
    role:{
       type:String,
       enum:["user", "admin"],
       default:"user"
    },
    createdAt:{
       Date
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date

})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel