const router = require("express").Router()
const paymentController = require("../controllers/paymentController")
const isAuth = require("../middleware/isAuth")

router.post('/booking', isAuth, paymentController.payBooking)

module.exports = router