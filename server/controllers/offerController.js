const BaseUser = require("../models/baseUser")
const Venue = require("../models/venue")
const Offer = require("../models/offer")
const errorHandler = require("../helper/errorHandler")

exports.getOffer = async (req, res, next) => {
  try {
    const offerId = req.params.id.split(" ")[0]
    const userId = req.params.id.split(" ")[1]

    const offer = await Offer.find({_id: offerId})

    if (!offer) {
      errorHandler(404, ["Your offer could not be found"])
    }

    if (userId !== offer.offerorId.toString() && userId !== offer.receiverId.toString()) {
      errorHandler(401, ["You are not authorized to access this offer"])
    }

    res.status(200).json({ offer: offer })
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

    if (!offers.offered || !offers.received) {
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