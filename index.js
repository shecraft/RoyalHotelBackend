const express = require("express")
const cors = require("cors")
// const morgan = require("morgan")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.use(morgan())

const connectToDB = require("./config/connectToDB")
connectToDB()
const authRouter = require("./routes/authRouter")
const bookingRouter = require("./routes/bookingRouter")
const paymentRoutes = require("./routes/paymentRoutes")
                           


 PORT = 4000
app.listen(PORT, ()=>{
    console.log("Running on port ");
    
})

app.use("/api/auth", authRouter)
app.use("/api/bookings",  bookingRouter)
app.use("/api/payments", paymentRoutes)