const router = require("express").Router()
const { body } = require("express-validator")
const adminController = require("../controllers/adminController")
const isAuth = require("../middleware/isAuth")
const checkForFalse = require("../helper/checkForFalse")
const checkForValidDate = require("../helper/checkForValidDate")

router.post(
  "/signup", 
  [
    body("name", "Invalid title").trim().isLength({min: 3}),
    body("email", "Invalid email").normalizeEmail().isEmail(),
    body("password", "Invalid password").custom((value, {req}) => {
      if (value.length < 6) {
        throw new Error("Password length must be at least 6 characters")
      }
      return true
    }) 
  ], 
  adminController.signUp
)

router.post("/login/", adminController.login)

router.post(
  "/venue", 
  isAuth, 
  [
    body("venueData.address", "Address cannot be empty").custom(checkForFalse),
    body("venueData.title", "These venue details are required").custom(checkForFalse).trim(),
    body("venueData.description", "These venue details are required").custom(checkForFalse),
    body("venueData.frequency", "Your frequency preference and experience level are required").custom(checkForFalse),
    body("venueData.experience", "Your frequency preference and experience level are required").custom(checkForFalse),
    body("venueData.price", "A payment type and base rate must be selected").isLength({ min: 2 }),
    body("venueData.type", "These venue details are required").custom(checkForFalse),
    body("venueData.capacity", "These venue details are required").isInt(),
    body("venueData.legalAgreement", "You must confirm that you accept the Terms of Service").custom(checkForFalse)
  ], 
  adminController.createVenue
)

router.get("/venue/:id", isAuth, adminController.getEditVenue)

router.put(
  "/update-venue/:id", 
  isAuth, 
  adminController.editVenue
)

router.post(
  "/booking/create", 
  isAuth, 
  [
    body("date", "Invalid date").custom(value => {
      return checkForValidDate(value)
    }),
  ],
  adminController.createBooking
)

router.get("/act/:id", isAuth, adminController.getEditAct)

router.post(
  "/act",
  isAuth,
  [
    body("actData.address", "Address cannot be empty").custom(checkForFalse),
    body("actData.title", "A title is required").custom(checkForFalse).trim(),
    body("actData.description", "You must provide a short description of your act").custom(checkForFalse),
    body("actData.price", "You must specify a base fee").custom(checkForFalse).isInt(),
    body("actData.legalAgreement", "You must confirm that you accept the Terms of Service").custom(checkForFalse)
  ],
  adminController.createAct
)

router.put(
  "/update-act/:id",
  isAuth,
  adminController.editAct
)

router.post(
  "/blog/:userId", 
  isAuth,
  [
    body("title", "Title must be at least 3 characters").trim().isLength({ min: 3 }),
    body("content", "Title must be at between 20 and 1000 characters").trim().isLength({ min: 20, max: 1000 })
  ],
  adminController.createBlog
)

router.post('/photo/s3-signatures', isAuth, adminController.getS3Signatures)

router.get("/booking-summary/:id", isAuth, adminController.getBookingSummary)

router.get('/show/:profileId/:showId', isAuth, adminController.getEditShow)

router.get('/profile/:profileType/:id', isAuth, adminController.getEditProfile)

router.put('/profile/update', isAuth, adminController.updateProfile)

router.delete("/delete-profile/:id", isAuth, adminController.deleteProfile)

router.post('/ticket/attended', isAuth, adminController.markTicketAttended)
module.exports = router