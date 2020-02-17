const BaseUser = require("../models/baseUser")
const Venue = require("../models/venue")
const Act = require("../models/act")
const Show = require("../models/show")

const errorHandler = require("../helper/errorHandler")

exports.basicSearch = async (req, res, next) => {
  try {
    const {keyword, location, page} = req.body

    const filters = {}
    const selectedFields = "title address _id type selfType"
    const paginate = {
      skip: page * 4, 
      limit: 4
    }

    if (keyword) {
      filters.title = new RegExp(keyword, "i")
    }

    if (location) {
      filters["address.description"] = new RegExp(location, "i")
    }

    const venueResults = Venue.find(filters, selectedFields + "price bannerPhoto", paginate)

    const actResults = Act.find(filters, selectedFields + "price bannerPhoto", paginate)

    const showResults = Show.find(filters, selectedFields + "ticketPrice photoUrl", paginate)

    const resultArrays = await Promise.all([actResults, venueResults, showResults])

    const results = [...resultArrays[0], ...resultArrays[1], ...resultArrays[2],]
    
    if(!results || !results.length) {
      errorHandler(404, ["No results found for this search"])
    }

    res.status(200).json({results: results})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }

    next(error)
  }
}

exports.searchVenue = async (req, res, next) => {
  try {
    const {
      keyword,
      location,
      priceRange,
      actFilters,
      page
    } = req.body

    const filters = {}
    const selectedFields = "title address _id "
    const paginate = {
      skip: page * 12,
      limit: 12
    }

    if (keyword) {
      filters.title = new RegExp(keyword, "i")
    }

    if (location) {
      filters["address.description"] = new RegExp(location, "i")
    }

    if (priceRange.max) {
      filters["fee"] = {
        $gte: priceRange.min || 0,
        $lt: priceRange.max
      }
    }

    if (actFilters.length > 0) {
      filters["actDetails.actType"] = { $in: actFilters }
    } 

    const actResults = await Act.find(filters, selectedFields + "bannerPhoto fees", paginate)

    if (!actResults || actResults.length < 1) {
      errorHandler(404, ["No results found for this search"])
    }

    res.status(200).json({ results: actResults })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }

    next(error)
  }
}

exports.searchAct = async (req, res, next) => {
  try {
    const {
      keyword,
      location,
      priceRange,
      priceType,
      venueFilters,
      page
    } = req.body

    const filters = {}
    const selectedFields = "title address _id "
    const paginate = {
      skip: page * 12,
      limit: 12
    }    

    if (keyword) {
      filters.title = new RegExp(keyword, "i")
    }

    if (location) {
      filters["address.description"] = new RegExp(location, "i")
    }

    if (priceRange.max) {
      filters["pricing.base"] = { 
        $gte: priceRange.min || 0, 
        $lt: priceRange.max 
      }
    }

    if (priceType) {
      filters["pricing.type"] = priceType
    }

    if (venueFilters.length > 0) {
      filters["venueDetails.venueType"] = { $in: venueFilters }
    } 

    const venueResults = await Venue.find(filters, selectedFields + "bannerPhoto pricing", paginate)

    if (!venueResults) {
      errorHandler(404, ["No results found for this search"])
    }

    res.status(200).json({ results: venueResults })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }

    next(error)
  }
}

exports.searchShowgoer = async (req, res, next) => {
  try {
    const {
      location,
      keyword,
      priceRange,
      dateRange,
      genreFilters,
      page
    } = req.body

    const filters = {}
    const selectedFields = "title address _id "
    const paginate = {
      skip: page * 12,
      limit: 12
    }

    if (keyword) {
      filters.title = new RegExp(keyword, "i")
    }

    if (location) {
      filters["address.description"] = new RegExp(location, "i")
    }

    if (priceRange.max) {
      filters.ticketPrice = {
        $gte: priceRange.min || 0,
        $lt: priceRange.max
      }
    }

    if (genreFilters.length > 0) {
      filters.genre = { $in: genreFilters }
    } 

    if (dateRange.end) {
      filters.showDate = {
        $gte: dateRange.start || new Date(),
        $lt: dateRange.end
      }
    }

    const showResults = await Show.find(filters, selectedFields + "ticketPrice photoUrl", paginate)

    if (!showResults) {
      errorHandler(404, ["No results found for this search"])
    }

    res.status(200).json({ results: showResults })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }

    next(error)
  }
}