const express = require("express")
const { createBooking, getUserBookings, cancelBooking } = require("../controllers/bookingController")
const verifyUser = require("../middlewares/verifyUser")

const bookingRouter = express.Router()

bookingRouter.post("/", verifyUser, createBooking)
bookingRouter.get("/my", verifyUser, getUserBookings)
bookingRouter.put("/cancel/:id", verifyUser, cancelBooking)

module.exports = bookingRouter
