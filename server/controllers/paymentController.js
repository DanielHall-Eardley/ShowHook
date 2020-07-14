const Booking = require("../models/booking")
const Show = require("../models/show")
const errorHandler = require("../helper/errorHandler")
const checkUserType = require('../helper/checkUserType')
const stripe = require('stripe')(process.env.STRIPE_SERVER_API_KEY)
const {uuid} = require('uuidv4')
const {format} = require('date-fns')

const createPaymentIntent = async (amount, currency, stripe) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    metadata: {integration_check: 'accept_a_payment'},
  },
  {
    idempotencyKey: uuid()
  })

  return paymentIntent
}

exports.createBookingPayment = async (req, res, next) => {
  try {
    const bookingId = req.body.bookingId

    const booking = await Booking.findById(bookingId)
      .populate('show')

    if (!booking) {
      errorHandler(404, ['Booking not found'])
    }  

    //verify the amount to be charged
    //create payment intent
    //send to client
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }

    next(error)
  }
}

exports.purchaseBooking = async (req, res, next) => {
  try {
    //upon successful payment publish the show
    const bookingId = req.body.bookingId

    const booking = await Booking.findById(bookingId)
      .populate('show')

    if (!booking) {
      errorHandler(404, ['Booking not found'])
    }  

    booking.paymentReceived = true
    booking.show.published = true
    const updatedBooking = await booking.save()

    res.status(200).json({
      msg: 'Payment successful'
    })
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }

    next(error)
  }
}

exports.createTicketPayment = async (req, res, next) => {
  try {
    const userPromise = checkUserType(req.body.profileType, req.body.userId)
    const showPromise = Show.findById(req.body.showId)
    const [user, show] = await Promise.all([userPromise, showPromise])
    
    if (!user) {
      errorHandler(404, ['Unable retrieve your profile'])
    }

    if (!show) {
      errorHandler(404, ['Unable retrieve the show details'])
    }
    
    if (user.userData) {
      if (
        show.venueId.toString() === user.userData.toString() || 
        show.actId.toString() === user.userData.toString()
      ) {
        errorHandler(401, ['You cannot purchase a ticket to a show hosted by venue or act that you are associated with'])
      }
    }

    const now = format(new Date(), 'T')
    const showDate = format(new Date(show.showDate), 'T')

    if (now > showDate) {
      errorHandler(401, 'This show has already taken place')
    }
    
    const existingTicket = user.tickets.find(ticket => ticket.showId.toString() === show._id.toString())

    if (existingTicket && existingTicket.paymentComplete) {
      errorHandler(208, ['You have already purchased a ticket for' + show.title])
    } 

    if (existingTicket && !existingTicket.paymentComplete && existingTicket.paymentIntentId) {
      return res.status(200).json({ticket: existingTicket})
    }

    const paymentIntent = await createPaymentIntent(show.ticketPrice, 'cad', stripe)

    const ticket = {
      price: show.ticketPrice,
      showDate: show.showDate,
      actTitle: show.actTitle,
      venueTitle: show.venueTitle,
      address: show.address.description,
      ticketHolderId: user._id,
      venueId: show.venueId,
      showId: show._id,
      actId: show.actId,
      paymentIntentId: paymentIntent.client_secret
    }
    
    const sortFn = (a, b) => {
      const aMilliseconds = format(new Date(a.showDate), 'T')
      const bMilliseconds = format(new Date(b.showDate), 'T')

      return aMilliseconds - bMilliseconds
    }
    
    const newArray = [...user.tickets, ticket]
    user.tickets = newArray.sort(sortFn)
    const updatedUser = await user.save()

    if (!updatedUser) {
      errorHandler(500, ['Unable save your ticket'])
    }

    res.status(200).json({ticket: updatedUser.tickets[0]})
  } catch (error) {
    next(error)
  }
}

exports.purchaseTicket = async (req, res, next) => {
  try {
    const user = await checkUserType(req.body.profileType, req.body.userId)
    if (!user) {
      errorHandler(404, ['Your profile could not be retrieved'])
    }
    const ticketId = req.body.id
    const update = {
      paymentIntentId: req.body.paymentId,
      paymentComplete: true,
    }

    const ticket = user.tickets.id(ticketId)
    ticket.set({
      ...ticket,
      ...update
    })
    console.log(ticket)

    const show = await Show.findById(ticket.showId)
    if (!show) {
      errorHandler(404, ['Cannot find asociated show'])
    }
    show.ticketsPurchased = show.ticketsPurchased + 1
    show.tickets.push(ticket)

    const [updatedShow, updateUser] = await Promise.all([show.save(), user.save()])
    
    if (!updatedShow || !updateUser) {
      errorHandler(500, ['There was a problem saving your ticket'])
    }

    res.status(200).json({
      msg: 'Ticket purchased!',
      redirect: {
        routeName: 'admin-profile',
        id: updateUser._id
      }
    })
  } catch (error) {
    next(error)
  }
}

exports.getTicket = async (req, res, next) => {
  try {
    const user = await checkUserType(req.body.profileType, req.body.userId)
    if (!user) {
      errorHandler(404, ['Your profile could not be retrieved'])
    }

    const findTicket = user.tickets.find(ticket => ticket._id.toString() === req.body.ticketId)
    if (!findTicket) {
      errorHandler(404, ['Your ticket could not be retrieved'])
    }

    res.status(200).json({ticket: findTicket})
  } catch (error) {
    next(error)
  }
}

