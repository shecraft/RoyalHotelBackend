const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const mongo_uri = process.env.mongo_uri

const connectToDB = async () => {
    try {
        const connected = await mongoose.connect(mongo_uri)
        if (connected) {
            console.log("MongoDB connected ✔️ ");
            
        }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectToDB