const Venue = require("../models/venue")
const Act = require("../models/act")
const BaseUser = require('../models/baseUser')
const Showgoer = require('../models/showgoer')
const calculateRating = require("../helper/calculateRating")
const errorHandler = require("../helper/errorHandler")
const paginate = require("../helper/paginate")
const checkUserType = require("../helper/checkUserType")

exports.getVenue = async (req, res, next) => {
  try {
    const id = req.params.id
    
    venue = await Venue.findById(id)
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

    const act = await Act.findById(id)
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

exports.requestToJoinAct = async (req, res, next) => {
  try {
    const actId = req.body.actId
    const userId = req.body.userId

    const act = await Act.findById(actId)

    if (!act) {
      errorHandler(404, ['Unable to find act'])
    }

    if (act.userId.toString() === userId) {
      errorHandler(401, ['You cannot join your own act'])
    }

    let loopLength = act.members.length
    if (act.memberRequests.length > act.members.length) {
      loopLength = act.memberRequests.length
    }

    for (let i = 0; i < loopLength; i++) {
      if (
        (act.members[i] && act.members[i].toString()) === userId || 
        (act.memberRequests[i] && act.memberRequests[i].toString()) === userId
      ) {
        return errorHandler(401, ['You are already a member or have a pending member request for this act'])
      }
    }

    act.memberRequests.push(userId)
    const updatedAct = await act.save()

    if (!updatedAct) {
      errorHandler(500, ['There was a problem sending your request'])
    }

    res.status(200).json({msg: 'Request to join ' + updatedAct.title + ' has been sent'})
  } catch (error) {
    next(error)
  }
}

exports.getProfile = async (req, res, next) => {
	try {
		const selectedUserFields = ['-email', '-password']
    const profile = await checkUserType(req.params.profileType, req.params.id, selectedUserFields)
    
    if (!profile) {
			errorHandler(404, ['Unable to find profile'])
		}

		res.status(200).json({profile: profile})
	} catch (error) {
		next(error)
	}
}