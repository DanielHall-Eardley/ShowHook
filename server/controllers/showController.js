const Show = require('../models/show')
const BaseUser = require('../models/baseUser')
const errorHandler = require('../helper/errorHandler')
const {sub, add} = require('date-fns')

exports.userShowSummary = async(req, res, next) => {
  try {
    const actOrVenueId = req.params.id
    const user = await BaseUser.findOne({userData: actOrVenueId})
    if (!user) {
      errorHandler(404, ['Unable to find your user information'])
    }

    const searchType = user.userType.toLowerCase() + "Id"
    let idToReturn;
    
    if (user.userType === 'act') {
      idToReturn = 'venueId'
    } else {
      idToReturn = 'actId'
    }

    const fields = `${idToReturn} title description showDate actTitle venueTitle price _id`

    const showList = await Show.find({[searchType]: actOrVenueId, published: true}, fields, {
      sort: {showDate: 'asc'}
    })

    if (!showList) {
      errorHandler(404, ['Unable to find your shows'])
    }

    res.status(200).json({
      showList: showList
    })
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }
    next(error)
  }
}

exports.getShow = async (req, res, next) => {
  try {
    const show = await Show.findById(req.params.id)

    if (!show) {
      errorHandler(404, ['Show not found'])
    }  

    res.status(200).json({
      show: show
    })
  } catch (error) {
    if (!error.status) {
      error.status = 500
    }

    next(error)
  }
}

exports.venueOrActShows = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await BaseUser.findById(userId)
    if (!user) {
      errorHandler(404, ['Unable to find your user information'])
    }

    const searchType = user.userType.toLowerCase() + "Id"
    const searchId = user.userData
    let profileSpecificFields;
    
    if (searchType === 'actId') {
      profileSpecificFields = 'venueId venueTitle'
    } else {
      profileSpecificFields = 'actId actTitle'
    }

    const fields = `${profileSpecificFields} title showDate ticketPrice ticketsPurchased numberOfTickets _id`

    const startDateInterval = sub(new Date(), {months: 2})
    const endDateInterval = add(new Date(), {months: 2})
    const shows = await Show.find(
      {
        [searchType]: searchId, 
        published: true, 
        showDate: {$gte: startDateInterval, $lte: endDateInterval}
      }, 
      fields, 
      {sort: {showDate: 'asc'}}
    )

    if (!shows) {
      errorHandler(404, ['Unable to find shows for this ' + user.userType])
    }

    res.status(200).json({
      shows: shows
    })
  } catch (error) {
    next(error)
  }
}