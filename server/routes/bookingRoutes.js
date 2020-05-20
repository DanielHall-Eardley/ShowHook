const router = require("express").Router()
const bookingController = require("../controllers/bookingController")
const isAuth = require("../middleware/isAuth")
const { body } = require("express-validator")

router.get("/booking/:id", bookingController.getBooking)

router.get("/bookings-summary/:id", isAuth, bookingController.getBookingsSummary)

router.put("/update-booking-status", isAuth, bookingController.updateBookingStatus)

router.put(
  "/update-show-setup", 
  isAuth, 
  [
    body('price', 'a price must be specified').toInt().isInt({gt: 0}),
    body('ticketPrice', 'a ticket price must be specified').toInt().isInt({gt: 0}),
  ],
  bookingController.updateShowSetup
)

router.put('/finalize-booking', isAuth, bookingController.finalizeBooking)

router.post('/booking/send-message', isAuth, bookingController.updateBookingMessage)

router.delete("/delete-booking", isAuth, bookingController.deleteBooking)

module.exports = router