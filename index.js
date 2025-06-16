const express = require("express")
const cors = require("cors")
// const morgan = require("morgan")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.use(morgan())

const connectToDB = require("./config/connectToDB")
const authRouter = require("./routes/authRouter")
connectToDB()


 PORT = 4000
app.listen(PORT, ()=>{
    console.log("Running on port ");
    
})

app.use("/api/auth", authRouter)