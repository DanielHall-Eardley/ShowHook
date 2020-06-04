const Show = require('../models/show')
const checkForValidationErr = require('../helper/checkForValidationErr')
const errorHandler = require('../helper/errorHandler')

exports.getShowSummary = async(req, res, next) => {
  try {
    checkForValidationErr(req)
    const userType = req.query.userType.toLowerCase()
    const searchType = userType + "Id"
    const userId = req.params.id
    let idToReturn;
    
    if (userType === 'act') {
      idToReturn = 'venueId'
    } else {
      idToReturn = 'actId'
    }

    const fields = `${idToReturn} title description showDate actTitle venueTitle price _id`

    const showList = await Show.find({[searchType]: userId, published: true}, fields, {
      sort: {createdAt: 'desc'}
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
    const showId = req.params.showId
 
    const show = await Show.findById(showId)
      .populate('show')

    if (!show) {
      errorHandler(404, ['Booking not found'])
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