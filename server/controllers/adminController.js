const BaseUser = require("../models/baseUser")
const Showgoer = require("../models/showgoer")
const Venue = require("../models/venue")
const Booking = require("../models/booking")
const Act = require("../models/act")
const Show = require("../models/show")

const { validationResult } = require("express-validator")
const errorHandler = require("../helper/errorHandler")
const checkUserType = require("../helper/checkUserType")
const checkForValidationErr = require("../helper/checkForValidationErr")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const calculateRating = require("../helper/calculateRating")
const paginate = require("../helper/paginate")
const {add, format} = require('date-fns')

const aws = require('aws-sdk')

//configure aws sdk
aws.config.update({
  region: 'ca-central-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

exports.signUp = async (req, res, next) => {
	try {
		checkForValidationErr(req)

		const userPromise = BaseUser.findOne({
			email: req.body.email
		});
		const showgoerPromise = Showgoer.findOne({
			email: req.body.email
		});

		const [baseUser, showgoer] = await Promise.all([userPromise, showgoerPromise])

		if (baseUser || showgoer) {
			errorHandler(403, ["Email is not available"]);
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		if(!hashedPassword) {
			errorHandler(500, ["Error saving password"])
		}

		let user;
		if (req.body.userType.toLowerCase() === 'showgoer') {
			user = new Showgoer({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
				userType: req.body.userType,
			})
		} else {
			user = new BaseUser({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
				userType: req.body.userType,
			})
		}

		const savedUser = await user.save()
		if (!savedUser) {
			errorHandler(500, ["Unable to save user"])
		}

		res.status(200).json({user: {
			name: savedUser.name,
			type: savedUser.userType
		}})

	} catch (error) {
		if (!error.status) {
			error.status = 500
		}
		next(error)
	}
}

exports.login = async (req, res, next) => {
	try {
		let user;
	
		const userActVenuePromise = BaseUser.findOne({email: req.body.email})
    const userShowgoerPromise = Showgoer.findOne({email: req.body.email})
    const [actOrVenue, showgoer] = await Promise.all([userActVenuePromise, userShowgoerPromise])
  
    if (!actOrVenue && showgoer) {
      user = showgoer
    } 

    if (actOrVenue && !showgoer) {
      user = actOrVenue
    }

		if (!user) {
			errorHandler(404, ["No user associated with " + req.body.email])
		}
		
		const confirmedPassword = await bcrypt.compare(req.body.password, user.password)
		if (!confirmedPassword) {
			errorHandler(401, ["There was a problem verifying your password"])
		}

		const token = jwt.sign({
			name: user.name,
			type: user.userType
		}, process.env.JWT_SECRET, {expiresIn: "7 days"})

		const expiration = format(add(new Date(), {days: 7}), 'T')
		res.status(200).json({ 
			token: token, 
			baseUser: {
				userId: user._id.toString(),
				name: user.name,
				userType: user.userType,
				userData: user.userData
			},
			expiresIn: expiration
		});

	} catch (error) {
    next(error);
	}
}

exports.createVenue = async (req, res, next) => {
	try {
		checkForValidationErr(req)

		const userPromise = BaseUser.findById(req.body.userId)
		const checkForVenuePromise = Venue.findOne({userId: req.body.userId})

		const [user, checkForVenue] = await Promise.all([userPromise, checkForVenuePromise])

		if (!user) {
			errorHandler(404, ["Unable to retrieve your user profile"])
		}

		if (user.userType.toLowerCase() !== "venue") {
			errorHandler("403", ["Incorrect user type"])
		}
		
		if (checkForVenue) {
			errorHandler("403", ["You already have venue associated with your account"])
		}
	
		const {
			address,
			type,
			capacity,
			bathrooms,
			bathroomType,
			amenities,
			suitableActTypes,
			title,
			description,
			experience,
			frequency,
			rules,
			genres,
			reviews,
			overallRating,
			price,
			priceType,
			photoUrlArray
		} = req.body
		
		const venue = new Venue({
			userId: req.body.userId,
			address: address,
			amenities: amenities,
			suitableActTypes: suitableActTypes,
			title: title,
			description: description,
			frequency: frequency,
			rules: rules,
			photoUrlArray: photoUrlArray,
			experience: experience,
			genres: genres,
			reviews: reviews,
			overallRating: overallRating,
			bannerPhoto: photoUrlArray[0],
			shows: [],
			priceType: priceType,
			price: price,
			capacity: capacity,
			bathrooms: bathrooms,
			type: type,
			bathroomType: bathroomType,
		})

		const savedVenue = await venue.save()

		if(!savedVenue) {
			errorHandler("500", ["Unable to store your venue information"])
		}

		user.userData = savedVenue._id
		const updatedUser = await user.save()

		if(!updatedUser) {
			errorHandler("500", ["Unable to update your profile"])
		}
		
		res.status(200).json({
			alert: "Sucessfully created your venue profile",
			type: updatedUser.userType.toLowerCase(),
			userData: savedVenue._id
		})
	} catch (error) {
		if (!error.status) {
		}
		next(error);
	}
}

exports.getEditVenue = async (req, res, next) => {
	try  {
		const id = req.params.id

		const venue = await Venue.findOne({userId: id})
		.populate({path: "userId", select: ["name", "_id", "userType"]})
	
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

exports.editVenue = async (req, res, next) => {
	try {
		const venue = await Venue.findOne({userId: req.params.id})

		if(!venue) {
			errorHandler(404, ["Your venue was unable to be retrieved"])
		}
		
		venue.photoUrlArray = req.body.photoUrlArray
		venue.genres = req.body.genres
		venue.title = req.body.title
		venue.description = req.body.description
		venue.amenities = req.body.amenities
		venue.price = req.body.price
		venue.priceType = req.body.priceType
		venue.rules = req.body.rules

		const updatedVenue = await venue.save()

		if (!updatedVenue) {
			errorHandler(500, ["Your changes were unable to be saved"])
		}

		res.status(200).json(updatedVenue)
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
}

exports.createBooking = async (req, res, next) => {
	try {
		checkForValidationErr(req)
		const populate = {
			populate: {
				path: "userData",
				select: ["title", "overallRating", "price"]
			}
		}
		
		const offerorPromise = BaseUser.findOne({_id: req.body.offerorId}, "name userType", populate)
		const receiverPromise = BaseUser.findOne({userData: req.body.receiverId}, "name userType", populate)

		const [offeror, receiver]  = await Promise.all([offerorPromise, receiverPromise])

		if (!offeror.userData) {
			errorHandler(404, ["You must have created a venue or act profile to make bookings"])
		} 
		
		if (offeror._id === receiver._id) {
			errorHandler(401, ["You cannot book any act or venues that are associated with your profile"])
		}

		const checkForDuplicateBooking = await Booking.findOne({ 
			offerorId: offeror._id,
			receiverId: receiver._id,
			bookingDate: req.body.date
		})

		if (checkForDuplicateBooking) {
			errorHandler(401, ["You have already created a booking for this date"])
		}

		let price = receiver.userData.price

		if (parseInt(req.body.price)) {
			price = req.body.price
		}

		let messageContent = req.body.message || "Hi, lets talk about a potential booking"

		const message = {
			userId: offeror._id,
			name: offeror.name,
			content: messageContent
		}

		let venueId
		let actId

		if (offeror.userType.toLowerCase() === 'venue') {
			venueId = offeror.userData
			actId = receiver.userData
		} else {
			actId = offeror.userData
			venueId = receiver.userData
		}
		
		const booking = new Booking({
			venueId: venueId,
			actId: actId,
			offerorId: offeror._id,
			offerorName: offeror.name,
			offerorType: offeror.userType,
			offerorTitle: offeror.userData.title,
			offerorRating: offeror.userData.overallRating,
			receiverId: receiver._id,
			receiverName: receiver.name,
			receiverType: receiver.userType,
			receiverTitle: receiver.userData.title,
			receiverRating: receiver.userData.overallRating,
			bookingDate: req.body.date,
			status: "Pending",
			mostRecentMessage: message.content,
		})

		booking.messageArray.push(message)

		const savedBooking = await booking.save()

		if (!savedBooking) {
			errorHandler(500, ["There was a problem creating your booking"])
		}

		res.status(200).json({response: savedBooking._id})
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
}

exports.createAct = async (req, res, next) => {
	try {
		checkForValidationErr(req)

		const userPromise = BaseUser.findById(req.body.userId)
		const checkForActPromise = Act.findOne({userId: req.body.userId})

		const [user, checkForAct] = await Promise.all([userPromise, checkForActPromise])

		if (!user) {
			errorHandler(404, ["Unable to retrieve your user profile"])
		}

		if (user.userType.toLowerCase() !== "act") {
			errorHandler("403", ["Incorrect user type"])
		}
		
		if (checkForAct) {
			errorHandler("403", ["You already have act associated with your account"])
		}
		const {
			address,
			title,
			description,
			requirements,
			preferences,
			price,
			priceType,
			actType,
			youtubeLink,
			soundcloudLink,
			genres,
			reviews,
			overallRating,
			blogs,
			type,
			photoUrlArray
		} = req.body

		const act = new Act({
			userId: req.body.userId,
			address: address,
			title: title,
			photoUrlArray: photoUrlArray,
			description: description,
			requirements: requirements,
			preferences: preferences,
			price: price,
			priceType: priceType,
			actType: actType,
			youtubeLink: youtubeLink,
			soundcloudLink: soundcloudLink,
			genres: genres,
			reviews: reviews,
			overallRating: overallRating,
			bannerPhoto: photoUrlArray[0],
			shows: [],
			blogs: blogs,
			type: type
		})

		const savedAct = await act.save()

		if(!savedAct) {
			errorHandler("500", ["Unable to store your act information"])
		}

		user.userData = savedAct._id
		const updatedUser = await user.save()

		if(!updatedUser) {
			errorHandler("500", ["Unable to update your profile"])
		}
		
		res.status(200).json({
			alert: "Sucessfully created your venue profile",
			type: updatedUser.userType.toLowerCase(),
			userData: savedAct._id
		})
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
}

exports.getEditAct = async (req, res, next) => {
	try {
		const id = req.params.id

		const act = await Act.findOne({$or: [
				{userId: id}, 
				{members: {$in: id}}
			]})
			.populate({ path: "userId", select: ["name", "_id", "userType"] })

		if (!act) {
			errorHandler(404, ["Act not found"])
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

exports.editAct = async (req, res, next) => {
	try {
		const act = await Act.findOne({ userId: req.params.id })

		if (!act) {
			errorHandler(404, ["Your act was unable to be retrieved"])
		}
		
		act.photoUrlArray = req.body.photoUrlArray
		act.genres = req.body.genres
		act.title = req.body.title
		act.description = req.body.description
		act.soundcloudLink = req.body.soundcloudLink
		act.description = req.body.description
		act.price = req.body.price

		const updatedAct = await act.save()

		if (!updatedAct) {
			errorHandler(500, ["Your changes were unable to be saved"])
		}

		res.status(200).json(updatedAct)
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
}

exports.createBlog = async (req, res, next) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			errorHandler(422, errors.array());
		}

		const act = await Act.findOne({userId: req.params.userId})

		if (!act) {
			errorHandler(404, ["Your profile was unable to be found"])
		}

		const blog = {
			title: req.body.title,
			content: req.body.content,
			imgUrl: req.body.imgUrl,
		}

		act.blogs.push(blog)
		const updatedAct = await act.save()

		if (!updatedAct) {
			errorHandler(500, ["Your changes were unable to be saved"])
		}

		const blogs = updatedAct.blogs
		const paginatedBlogs = paginate(0, 3, blogs)

		res.status(200).json({blogs: paginatedBlogs})
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
}

exports.deleteProfile = async (req, res, next) => {
	try {
		const deleteType = req.query.deleteType || "full"
		const id = req.params.id

		const baseProfile = await BaseUser.findOne({userData: id})

		if (!baseProfile) {
			errorHandler(500, ["Unable to retrieve your profile"])
		}

		let listingProfile;

		if (baseProfile.userType.toLowerCase() === "venue") {
			listingProfile = await Venue.findById(id)
		}

		if (baseProfile.userType.toLowerCase() === "act") {
			listingProfile = await Act.findById(id)
		}

		if (!listingProfile) {
			errorHandler(500, ["Unable to retrieve your listing"])
		}
		
		const deleteListing = await listingProfile.remove()
		if (deleteType === "partial") {
			baseProfile.userData = undefined
			baseProfile.save()
		}
		
		if (deleteType === "full") {
			const deleteProfile = await baseProfile.remove()
		}

		res.status(200).json({
			listing: deleteListing,
			profile: deleteProfile
		})
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
}

exports.getEditShow = async (req, res, next) => {
  try {
    const profileId = req.params.profileId
		const showId = req.params.showId

    const show = await Show.findById(showId)
      .populate('show')
		
    if (!show) {
      errorHandler(404, ['Show not found'])
    }  
		
		if (show.actId.toString() !== profileId && show.venueId.toString() !== profileId) {
			errorHandler(401, ['You are not authorized to edit this show'])
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

exports.getEditProfile = async (req, res, next) => {
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


exports.updateProfile = async (req, res, next) => {
	try {
    const profile = await checkUserType(req.body.profileType, req.body.userId)

		if (!profile) {
			errorHandler(404, ['Unable to find profile'])
		}

		profile.bio = req.body.bio
		profile.profilePhoto = req.body.profilePhoto

		const updatedProfile = await profile.save()

		if (!updatedProfile) {
			errorHandler(404, ['Unable to update profile'])
		}

		const keys = Object.keys(updatedProfile.toObject())
		const removeSensitiveFields = {}

		for (let key of keys) {
			if (updatedProfile[key] !== 'email' && updatedProfile[key] !== 'password') {
				removeSensitiveFields[key] = updatedProfile[key]
			}
		}

		res.status(200).json({profile: removeSensitiveFields})
	} catch (error) {
		next(error)
	}
}

exports.getS3Signatures = async (req, res, next) => {
	try {
    let s3SignatureArray;
    if(req.body.s3PhotoInfo.length > 0) {
			
      //Create an array of promises
      const s3PromiseArray = []
      for (let photo of req.body.s3PhotoInfo) {
        const fileName = photo.fileName
        const fileExtension = photo.fileExtension
        
        const s3Params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileName,
          Expires: 60,
          ContentType: fileExtension,
          ACL: 'public-read'
        }

        const s3 = new aws.S3()
        const signedUrl = s3.getSignedUrl('putObject', s3Params)
        s3PromiseArray.push(signedUrl)
      }

      //Resolve all promises concurrently
      s3SignatureArray = await Promise.all(s3PromiseArray)
    }

    res.status(200).json({signatures: s3SignatureArray})
  } catch (error) {
    next(error)
  }
}

exports.markTicketAttended = async (req, res, next) => {
  try {
    //upon successful payment update the ticket with show, venue and act info
  } catch (error) {
    next(error)
  }
}



