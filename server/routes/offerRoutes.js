const router = require("express").Router()
const offerController = require("../controllers/offerController")
const isAuth = require("../middleware/isAuth")
const { body } = require("express-validator")
const checkForFalse = require('../helper/checkForFalse')

router.get("/offer/:id", offerController.getOffer)

router.get("/offers-summary/:id", isAuth, offerController.getOffersSummary)

router.put("/update-offer-status", isAuth, offerController.updateOfferStatus)

router.put(
  "/update-show-setup", 
  isAuth, 
  [
    body('price', 'a price must be specified').toInt().isInt({gt: 0}),
    body('ticketPrice', 'a ticket price must be specified').toInt().isInt({gt: 0}),
  ],
  offerController.updateShowSetup
)

router.put('/finalize-offer', isAuth, offerController.finalizeOffer)

router.post('/offer/send-message', isAuth, offerController.updateOfferMessage)

router.delete("/delete-offer", isAuth, offerController.deleteOffer)

module.exports = router