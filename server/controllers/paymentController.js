const Booking = require('../models/booking')

exports.payBooking = async (req, res, next) => {
  try {
    //make stripe payment

    const bookingId = req.body.bookingId

    const booking = await Booking.findById(bookingId)
      .populate('show')

    if (!booking) {
      errorHandler(404, ['Booking not found'])
    }  

    booking.paymentReceived = true
    const updatedBooking = await booking.save()

    res.status(200).json({
      booking: updatedBooking,
      show: updatedBooking.show
    })
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }

    next(error)
  }
}