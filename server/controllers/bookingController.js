const BaseUser = require("../models/baseUser")
const Venue = require("../models/venue")
const Act = require("../models/act")
const Booking = require("../models/booking")
const Show = require("../models/show")
const errorHandler = require("../helper/errorHandler")
const socket = require('../helper/socket.io')
const checkForValidationError = require('../helper/checkForValidationErr')

exports.getBooking = async (req, res, next) => {
  try {
    const id = req.params.id

    const booking = await Booking.findById(id, null, {
      populate: {
        path: "show"
      }
    })

    if (!booking) {
      errorHandler(404, ["Your booking could not be found"])
    }

    res.status(200).json({ 
      booking: booking,
      show: booking.show 
    })

  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.getBookingsSummary = async (req, res, next) => {
  try {
    const id = req.params.id
    const now = new Date()
    
    const receivedBookingsPromise = Booking.find({receiverId: id, bookingDate: {$gte: now}}) 
    const offeredBookingsPromise = Booking.find({offerorId: id, bookingDate: {$gte: now}})

    const [received, offered] = await Promise.all([receivedBookingsPromise, offeredBookingsPromise])

    res.status(200).json({received: received, offered: offered})
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.body.bookingId)
    const userId = req.body.userId

    if (!booking) {
      errorHandler(404, ["Booking not found"])
    }

    if (
      booking.receiverId.toString() !== userId && 
      booking.offerorId.toString() !== userId
    ) {
      errorHandler(401, ["You are not authorized to modify this booking"])
    }

    if (userId === booking.receiverId.toString()) {
      booking.receiverStatus = req.body.status
    }

    if (userId === booking.offerorId.toString()) {
      booking.receiverStatus = req.body.status
    }

    if (booking.receiverStatus === booking.offerorStatus) {
      booking.status = booking.receiverStatus
    }

    let savedShow = {}

    if (booking.status === "Negotiating" && !booking.show) {
      let actProfile;
      let venueProfile; 

      const selectedActFields = "title bannerPhoto _id"
      const selectedVenueFields = "title address capacity _id"

      if (booking.receiverType.toLowerCase() === "venue") {
        actProfile = Act.findOne({ userId: booking.offerorId }, selectedActFields)
        venueProfile = Venue.findOne({ userId: booking.receiverId }, selectedVenueFields)
      } else {
        actProfile = Act.findOne({ userId: booking.receiverId }, selectedActFields)
        venueProfile = Venue.findOne({ userId: booking.offerorId }, selectedVenueFields)
      }

      const results = await Promise.all([actProfile, venueProfile])

      const [act, venue] = results
     
      const show = new Show({
        actTitle: act.title,
        venueTitle: venue.title,
        actId: act._id,
        venueId: venue._id,
        address: venue.address,
        showDate: booking.bookingDate,
        numberOfTickets: 0,
        capacity: venue.capacity,
        photoUrl: act.bannerProfile
      })

      savedShow = await show.save()
      booking.show = savedShow._id
    }

    const updatedBooking = await booking.save()
    const response ={ 
      booking: updatedBooking,
      show: savedShow
    }
    res.status(200).json({msg: 'Response returned via socket.io'})

    socket.io().of('/booking').to(updatedBooking._id.toString()).emit('updateBooking', response)
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.updateBookingMessage = async (req, res, next) => {
  try {
    const bookingId = req.body.bookingId
    const booking = await Booking.findById(bookingId)

    if (!booking) {
      errorHandler(404, ["Your booking could not be found"])
    }

    const message = {
      userId: req.body.userId,
      content: req.body.content,
      name: req.body.name
    }

    booking.mostRecentMessage = message
    booking.messageArray.push(message)
    await booking.save()
    const lastMessage = booking.messageArray[booking.messageArray.length - 1]

    res.status(200).json({msg: 'Response returned via socket.io'})

    socket.io().of('/booking').to(bookingId.toString()).emit('updateMessage', lastMessage)
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

    const bookingId = req.body.bookingId
    const userId = req.body.userId

    const booking = await Booking.findById(bookingId)

    if (!booking) {
      errorHandler(404, ["Your booking could not be found"])
    }

    if (
      userId.toString() !== booking.offerorId.toString() && 
      userId.toString() !== booking.receiverId.toString()
    ) {
      errorHandler(401, ["You are not authorized to modify this booking"])
    }

    if (req.body.priceType === 'Split') {
      if (req.body.actProfit + req.body.venueProfit !== 100) {
        errorHandler(422, ['Combined profit split must add up 100%'])
      }
    }

    const show = await Show.findById(booking.show)

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
      booking: booking,
      show: savedShow
    }
    res.status(200).json({msg: 'Response returned via socket.io'})

    socket.io().of('/booking').to(booking._id.toString()).emit('updateBooking', response)
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }

    next(error)
  }
}

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.body.bookingId)
    const userId = req.body.userId

    if (!booking) {
      errorHandler(404, ["Booking not found"])
    }

    if (
      booking.receiverId.toString() !== userId &&
      booking.offerorId.toString() !== userId
    ) {
      errorHandler(401, ["You are not authorized to modify this booking"])
    }

    const remove = await booking.deleteOne()

    if (!remove) {
      errorHandler(500, ["There was a problem deleting your booking"])
    }

    res.status(200).json({ response: "Succesfully removed booking"})
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.finalizeBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.body.bookingId).populate('show')
    const userId = req.body.userId

    if (!booking) {
      errorHandler(404, ["Booking not found"])
    }

    if (
      booking.receiverId.toString() !== userId.toString() &&
      booking.offerorId.toString() !== userId.toString()
    ) {
      errorHandler(401, ["You are not authorized to modify this booking"])
    }

    if (booking.offerorId.toString() === userId.toString()) {
      booking.offerorStatus = req.body.status
    }

    if (booking.receiverId.toString() === userId.toString()) {
      booking.receiverStatus = req.body.status
    }

    if (booking.offerorStatus === booking.receiverStatus) {
      booking.status = booking.receiverStatus
    }

    if (req.body.status === 'Negotiating') {
      booking.status = 'Negotiating'
    }

    const updatedBooking = await booking.save()

    const response = { 
      booking: updatedBooking,
      show: updatedShow
    }
    
    res.status(200).json({msg: 'Response returned via socket.io'})

    socket.io().of('/booking').to(booking._id.toString()).emit('updateBooking', response)
   
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

