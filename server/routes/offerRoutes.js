const router = require("express").Router()
const offerController = require("../controllers/offerController")
const isAuth = require("../middleware/isAuth")

router.get("/conversation/:id", isAuth, offerController.getOffer)

router.get("/offers-summary/:id", isAuth, offerController.getOffersSummary)

module.exports = router