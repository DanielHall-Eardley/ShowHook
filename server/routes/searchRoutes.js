const router = require("express").Router()
const searchController = require("../controllers/searchController")
const isAuth = require("../middleware/isAuth")

router.post("/", searchController.basicSearch)
router.post("/venue", isAuth, searchController.searchVenue)
router.post("/act", isAuth, searchController.searchAct)
router.post("/showgoer", isAuth, searchController.searchShowgoer)

module.exports = router