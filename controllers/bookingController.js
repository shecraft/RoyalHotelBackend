const Booking = require("../models/booking");

const createBooking = async (req, res) => {
  try {
    const { roomType, checkIn, checkOut, numberOfGuests } = req.body;

    if (!roomType || !checkIn || !checkOut || !numberOfGuests) {
      return res.status(400).json({ status: "Error", message: "All fields are required" });
    }

    const booking = await Booking.create({
      user: req.user.id, 
      roomType,
      checkIn,
      checkOut,
      numberOfGuests
    });
    
    if (new Date(checkOut) <= new Date(checkIn)) {
    return res.status(400).json({
      status: "Error",
      message: "Check-out date must be after check-in date",
   });
}


    return res.status(201).json({
      status: "Success",
      message: "Booking successful",
      booking
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Error", message: "Server error" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    // ✅ Add this line to check the logged-in user
    console.log("User fetching bookings:", req.user.id); 

    const bookings = await Booking.find({ user: req.user.id }).sort({ checkIn: 1 });

    return res.status(200).json({
      status: "Success",
      bookings
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Error", message: "Server error" });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      status: "Success",
      message: "Booking cancelled",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Server error" });
  }
};


// (Optional) Admin: Get all bookings in the system
// const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate("user", "name email").sort({ checkIn: 1 });

//     return res.status(200).json({
//       status: "Success",
//       bookings
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ status: "Error", message: "Server error" });
//   }
// };

module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking
//   getAllBookings
};
