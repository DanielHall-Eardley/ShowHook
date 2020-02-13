const router = require("express").Router()
const googleApiController = require("../controllers/googleApiController")

router.post("/address-autocomplete", googleApiController.addressAutoComplete)

router.get("/map", googleApiController.getMapApi)

module.exports = router