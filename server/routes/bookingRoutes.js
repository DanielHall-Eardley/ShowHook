const router = require("express").Router()
const bookingController = require("../controllers/bookingController")
const isAuth = require("../middleware/isAuth")
const { body } = require("express-validator")

router.get("/:id", bookingController.getBooking)

router.get("/summary/:id", isAuth, bookingController.getBookingsSummary)

router.put("/update/status", isAuth, bookingController.updateBookingStatus)

router.put(
  "/update/show-setup", 
  isAuth, 
  [
    body('price', 'a price must be specified').toInt().isInt({gt: 0}),
    body('ticketPrice', 'a ticket price must be specified').toInt().isInt({gt: 0}),
  ],
  bookingController.updateShowSetup
)

router.put('/finalize', isAuth, bookingController.finalizeBooking)

router.post('/send-message', isAuth, bookingController.updateBookingMessage)

router.post('/payment', isAuth, bookingController.payBooking)

router.delete("/delete", isAuth, bookingController.deleteBooking)

module.exports = router