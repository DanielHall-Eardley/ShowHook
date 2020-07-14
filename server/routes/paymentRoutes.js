const router = require("express").Router()
const paymentController = require("../controllers/paymentController")
const isAuth = require("../middleware/isAuth")

router.post('/booking/create', isAuth, paymentController.createBookingPayment)
router.post('/booking/purchase', isAuth, paymentController.purchaseBooking)
router.post('/ticket/', isAuth, paymentController.getTicket)
router.post('/ticket/create', isAuth, paymentController.createTicketPayment)
router.post('/ticket/purchase', isAuth, paymentController.purchaseTicket)

module.exports = router