const Payment = require("../models/payment");
const Booking = require("../models/booking");

const submitManualPayment = async (req, res) => {
  console.log("BODY:", req.body); // 🧪 Log body
  console.log("FILE:", req.file); // 🧪 Log file

  try {
    const { name, bankName, amount, bookingId } = req.body;
    const screenshot = req.file ? req.file.path : null;

    if (!screenshot) {
      return res.status(400).json({ message: "Screenshot is required" });
    }

    // Save payment
    const payment = new Payment({
      name,
      bankName,
      amount,
      bookingId,
      screenshot,
    });

    await payment.save();

    // Try to update booking and check if it exists
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "payment pending" },
      { new: true }
    );

    if (!updatedBooking) {
      // This will now throw a clear error if the booking doesn't exist
      throw new Error("Booking not found with this ID");
    }

    res.status(201).json({
      message: "✅ Payment submitted successfully",
      payment,
    });
  } catch (error) {
    console.log("❌ Error:", error.message); // Helpful for debugging
    res.status(500).json({
      message: "Payment failed",
      error: error.message,
    });
  }
};

module.exports = { submitManualPayment };
