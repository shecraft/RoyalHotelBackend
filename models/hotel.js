const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    location:{},
    prices:{},
    description:{},
    images:{}
})