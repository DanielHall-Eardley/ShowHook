const BaseUser = require("../models/baseUser")
const Venue = require("../models/venue")
const Act = require("../models/act")
const Offer = require("../models/offer")
const Show = require("../models/show")
const errorHandler = require("../helper/errorHandler")
const socket = require('../helper/socket.io')
const checkForValidationError = require('../helper/checkForValidationErr')

exports.getOffer = async (req, res, next) => {
  try {
    const id = req.params.id

    const offer = await Offer.findById(id, null, {
      populate: {
        path: "show"
      }
    })

    if (!offer) {
      errorHandler(404, ["Your offer could not be found"])
    }

    res.status(200).json({ 
      offer: offer,
      show: offer.show 
    })

  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.getOffersSummary = async (req, res, next) => {
  try {
    const id = req.params.id

    const receivedOffersPromise = Offer.find({receiverId: id}) 

    const offersPromise = Offer.find({offerorId: id})

    const result = await Promise.all([receivedOffersPromise, offersPromise])

    const offers = {received: result[0], offered: result[1]}

    if (!offers.offered && !offers.received) {
      errorHandler(404, ["No offers found"])
    }

    res.status(200).json({ offers: offers })
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.updateOfferStatus = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.body.offerId)
    const userId = req.body.userId

    if (!offer) {
      errorHandler(404, ["Offer not found"])
    }

    if (
      offer.receiverId.toString() !== userId && 
      offer.offerorId.toString() !== userId
    ) {
      errorHandler(401, ["You are not authorized to modify this offer"])
    }

    if (userId === offer.receiverId.toString()) {
      offer.receiverStatus = req.body.status
    }

    if (userId === offer.offerorId.toString()) {
      offer.receiverStatus = req.body.status
    }

    if (offer.receiverStatus === offer.offerorStatus) {
      offer.status = offer.receiverStatus
    }

    let savedShow = {}

    if (offer.status === "Negotiating" && !offer.show) {
      let actProfile;
      let venueProfile; 

      const selectedActFields = "title bannerPhoto _id"
      const selectedVenueFields = "title address capacity _id"

      if (offer.receiverType.toLowerCase() === "venue") {
        actProfile = Act.findOne({ userId: offer.offerorId }, selectedActFields)
        venueProfile = Venue.findOne({ userId: offer.receiverId }, selectedVenueFields)
      } else {
        actProfile = Act.findOne({ userId: offer.receiverId }, selectedActFields)
        venueProfile = Venue.findOne({ userId: offer.offerorId }, selectedVenueFields)
      }

      const results = await Promise.all([actProfile, venueProfile])

      const [act, venue] = results
     
      const show = new Show({
        actTitle: act.title,
        venueTitle: venue.title,
        actId: act._id,
        venueId: venue._id,
        address: venue.address,
        showDate: offer.bookingDate,
        numberOfTickets: 0,
        capacity: venue.capacity,
        photoUrl: act.bannerProfile
      })

      savedShow = await show.save()
      offer.show = savedShow._id
    }

    const updatedOffer = await offer.save()
    const response ={ 
      offer: updatedOffer,
      show: savedShow
    }
    res.status(200).json({msg: 'Response returned via socket.io'})

    socket.io().of('/offer').to(updatedOffer._id.toString()).emit('updateOffer', response)
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.updateOfferMessage = async (req, res, next) => {
  try {
    const offerId = req.body.offerId
    const offer = await Offer.findById(offerId)

    if (!offer) {
      errorHandler(404, ["Your offer could not be found"])
    }

    const message = {
      userId: req.body.userId,
      content: req.body.content,
      name: req.body.name
    }

    offer.mostRecentMessage = message
    offer.messageArray.push(message)
    await offer.save()
    const lastMessage = offer.messageArray[offer.messageArray.length - 1]

    res.status(200).json({msg: 'Response returned via socket.io'})

    socket.io().of('/offer').to(offerId.toString()).emit('updateMessage', lastMessage)
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.updateShowSetup = async (req, res, next) => {
  try {
    checkForValidationError(req)

    const offerId = req.body.offerId
    const userId = req.body.userId

    const offer = await Offer.findById(offerId)

    if (!offer) {
      errorHandler(404, ["Your offer could not be found"])
    }

    if (
      userId.toString() !== offer.offerorId.toString() && 
      userId.toString() !== offer.receiverId.toString()
    ) {
      errorHandler(401, ["You are not authorized to modify this offer"])
    }

    if (req.body.priceType === 'Split') {
      if (req.body.actProfit + req.body.venueProfit !== 100) {
        errorHandler(422, ['Combined profit split must add up 100%'])
      }
    }

    const show = await Show.findById(offer.show)

    if (!show) {
      errorHandler(404, ["Your show could not be found"])
    }

    let guestNumber = req.body.numberOfTickets
    if (guestNumber > show.capacity) {
      errorHandler(403, ['The number of guests must less than venue capacity'])
    }

    if (req.body.priceType === 'Split') {
      show.actProfit = req.body.actProfit
      show.venueProfit = req.body.venueProfit
    }

    show.title = req.body.title
    show.description = req.body.description
    show.guestList = req.body.guestList
    show.ticketPrice = req.body.ticketPrice
    show.price = req.body.price
    show.priceType = req.body.priceType
    show.schedule = req.body.schedule
    show.actRequirements = req.body.actRequirements
    show.venueRequirements = req.body.venueRequirements
    show.numberOfTickets = guestNumber

    const savedShow = await show.save()

    const response ={ 
      offer: offer,
      show: savedShow
    }
    res.status(200).json({msg: 'Response returned via socket.io'})

    socket.io().of('/offer').to(offer._id.toString()).emit('updateOffer', response)
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }

    next(error)
  }
}

exports.deleteOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.body.offerId)
    const userId = req.body.userId

    if (!offer) {
      errorHandler(404, ["Offer not found"])
    }

    if (
      offer.receiverId.toString() !== userId &&
      offer.offerorId.toString() !== userId
    ) {
      errorHandler(401, ["You are not authorized to modify this offer"])
    }

    const remove = await offer.deleteOne()

    if (!remove) {
      errorHandler(500, ["There was a problem deleting your offer"])
    }

    res.status(200).json({ response: "Succesfully removed offer"})
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.finalizeOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.body.offerId)
    const userId = req.body.userId

    if (!offer) {
      errorHandler(404, ["Offer not found"])
    }

    if (
      offer.receiverId.toString() !== userId.toString() &&
      offer.offerorId.toString() !== userId.toString()
    ) {
      errorHandler(401, ["You are not authorized to modify this offer"])
    }

    if (offer.offerorId.toString() === userId.toString()) {
      offer.offerorStatus = req.body.status
    }

    if (offer.receiverId.toString() === userId.toString()) {
      offer.receiverStatus = req.body.status
    }

    if (offer.offerorStatus === offer.receiverStatus) {
      offer.status = offer.receiverStatus
    }

    if (req.body.status === 'Negotiating') {
      offer.status = 'Negotiating'
    }

    const updatedOffer = await offer.save()

    const response ={ 
      offer: updatedOffer,
    }
    
    res.status(200).json({msg: 'Response returned via socket.io'})

    socket.io().of('/offer').to(offer._id.toString()).emit('updateOffer', response)
   
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}