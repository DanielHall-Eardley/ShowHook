const router = require("express").Router()
const profileController = require("../controllers/profileController")
const isAuth = require('../middleware/isAuth')

router.get("/venue/:id", profileController.getVenue)
router.get("/act/:id", profileController.getAct)
router.get('/profile/:profileType/:id', profileController.getProfile)
router.get("/blogs/:id", profileController.getBlogs)
router.get("/blog/:id", profileController.getBlog)
router.post('/request/join-act', isAuth, profileController.requestToJoinAct)

module.exports = router