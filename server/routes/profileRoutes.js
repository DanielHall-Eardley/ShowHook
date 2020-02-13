const router = require("express").Router()
const profileController = require("../controllers/profileController")

router.get("/venue/:id", profileController.getVenue)
router.get("/act/:id", profileController.getAct)
router.get("/blogs/:id", profileController.getBlogs)
router.get("/blog/:id", profileController.getBlog)

module.exports = router