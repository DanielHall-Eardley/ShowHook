const router = require("express").Router()
const offerController = require("../controllers/offerController")
const isAuth = require("../middleware/isAuth")

router.get("/conversation/:id", isAuth, offerController.getOffer)

module.exports = router