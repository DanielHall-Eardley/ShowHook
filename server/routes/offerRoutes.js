const router = require("express").Router()
const offerController = require("../controllers/offerController")
const isAuth = require("../middleware/isAuth")

router.get("/offer/:id", offerController.getOffer)

router.get("/offers-summary/:id", isAuth, offerController.getOffersSummary)

router.put("/update-offer-status", isAuth, offerController.updateOfferStatus)

router.post('/offer/send-message', isAuth, offerController.updateOfferMessage)

router.delete("/delete-offer", isAuth, offerController.deleteOffer)

module.exports = router