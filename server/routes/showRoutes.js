const router = require("express").Router()
const isAuth = require("../middleware/isAuth")
const showController = require('../controllers/showController')

router.get('/summary/:id', isAuth, showController.getShowSummary)

router.get('/:id', showController.getShow)

module.exports = router