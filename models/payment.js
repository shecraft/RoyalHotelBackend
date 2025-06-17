const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  screenshot: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
