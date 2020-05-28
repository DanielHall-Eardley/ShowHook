const Show = require('../models/show')
const checkForValidationErr = require('../helper/checkForValidationErr')
const errorHandler = require('../helper/errorHandler')

exports.getShowSummary = async(req, res, next) => {
  try {
    checkForValidationErr(req)
    const searchType = req.query.searchType
    const userId = req.params.id

    const showList = await Show.find({[searchType]: userId})

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