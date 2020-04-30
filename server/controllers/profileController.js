const Venue = require("../models/venue")
const Act = require("../models/act")
const calculateRating = require("../helper/calculateRating")
const errorHandler = require("../helper/errorHandler")
const paginate = require("../helper/paginate")

exports.getVenue = async (req, res, next) => {
  try {
    const id = req.params.id
    const idType = req.query.idType || "_id" 
    console.log(idType)
    venue = await Venue.findOne({[idType]: id})
      .populate({ path: "userId", select: ["name", "_id", "userType"] })
    if (!venue) {
      errorHandler(404, ["Venue not found"])
    }

    let data = venue

    if (venue.reviews.length > 0) {
      venue.overallRating = calculateRating(venue.reviews)
      const updatedVenue = await venue.save()
      data = updatedVenue
    }

    res.status(200).json({
      venue: data
    })
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
}

exports.getAct = async (req, res, next) => {
  try {
    const id = req.params.id
    const searchType = req.query.idType || "_id"

    const act = await Act.findOne({[searchType]: id })
      .populate({ path: "userId", select: ["name", "_id", "userType"] })

    if (!act) {
      errorHandler(404, ["Venue not found"])
    }

    let data = act

    if (act.reviews.length > 0) {
      act.overallRating = calculateRating(act.reviews)
      const updatedAct = await act.save()
      data = updatedAct
    }

    const blogs = data.blogs
    const paginatedBlogs = paginate(0, 3, blogs)
    data.blogs = paginatedBlogs

    res.status(200).json({
      act: data
    })
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
}

exports.getBlogs = async (req, res, next) => {
  try {
    const userType = req.query.userType
    const page = req.query.page
    const profileId = req.params.id
    let profile;
    
    if (userType === "Act") {
      profile = await Act.findById(profileId)
    } else {
      profile = await Venue.findById(profileId)
    }

    if (!profile) {
      errorHandler(404, ["Profile not found"])
    }
    
    const paginatedBlogs = paginate(parseInt(page), 3, profile.blogs)
    
    if (!paginatedBlogs) {
      errorHandler(404, ["Blogs not found"])
    }
    res.status(200).json({
      blogs: paginatedBlogs,
      userType: userType
    })
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
}

exports.getBlog = async (req, res, next) => {
  try {
    const userType = req.query.userType
    const blogId = req.params.id
    const profileId = req.query.profileId
    let profile;

    if (userType === "Act") {
      profile = await Act.findById(profileId)
    } else {
      profile = await Venue.findById(profileId)
    }

    if (!profile) {
      errorHandler(404, ["Profile not found"])
    }

    const blog = profile.blogs.find(el => el._id.toString() === blogId.toString())

    if (!blog) {
      errorHandler(404, ["This blog could not be found"])
    }

    res.status(200).json({ 
      blog: blog,
    })
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
}