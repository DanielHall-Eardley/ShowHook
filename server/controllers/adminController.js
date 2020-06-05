const BaseUser = require("../models/baseUser")
const Venue = require("../models/venue")
const Booking = require("../models/booking")
const Act = require("../models/act")
const Show = require("../models/show")

const { validationResult } = require("express-validator")
const errorHandler = require("../helper/errorHandler")
const checkForValidationErr = require("../helper/checkForValidationErr")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const calculateRating = require("../helper/calculateRating")
const paginate = require("../helper/paginate")

exports.signUp = async (req, res, next) => {
	try {
		checkForValidationErr(req)

		const checkEmailAvailibity = await BaseUser.findOne({
			email: req.body.email
		});
		if (checkEmailAvailibity) {
			errorHandler(403, ["Email is not available"]);
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		if(!hashedPassword) {
			errorHandler(500, ["Error saving password"])
		}

		const user = new BaseUser({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			userType: req.body.userType,
		})

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
		const findUser = await BaseUser.findOne({email: req.body.email})
		if (!findUser) {
			errorHandler(404, ["No user associated with" + req.body.email])
		}
		
		const confirmedPassword = await bcrypt.compare(req.body.password, findUser.password)
		if (!confirmedPassword) {
			errorHandler(401, ["There was a problem verifying your password"])
		}

		const token = jwt.sign({
			name: findUser.name,
		}, process.env.JWT_SECRET, {expiresIn: "4h"})

		res.status(200).json({ 
			token: token, 
			baseUser: {
				userId: findUser._id.toString(),
				name: findUser.name,
				userType: findUser.userType,
				userData: findUser.userData
			},
			expiresIn: 3600 * 1000 * 4
		});

	} catch (error) {
		if (!error.status) {
      error.status = 500;
    }
    next(error);
	}
}

exports.createVenue = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!req.files) {
			errors.errors.push({
				msg: "At least one photo of your venue is required",
				param: "VenueData.photos"
			})
		}
		
		if (!errors.isEmpty()) {
			errorHandler(422, errors.array());
		}

		if (req.body.userType.toLowerCase() !== "venue") {
			errorHandler("403", ["Incorrect user type"])
		}

		const checkForVenue = await Venue.findOne({userId: req.body.userId})
		
		if (checkForVenue) {
			errorHandler("403", ["You already have venue associated with your account"])
		}
		//test this if logic
		let photos;
		if (req.files.photos && !Array.isArray(req.files.photos)) {
			photos = req.files.photos.name
		}

		if (req.files.photos && Array.isArray(req.files.photos)) {
			photos = req.files.photos.map(file => {
				return file.name
			}) 
		} 
		//store photo file somewhere

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
			bannerPhoto,
			price,
			priceType,
		} = req.body.venueData
		
		const venue = new Venue({
			userId: req.body.userId,
			address: address,
			amenities: amenities,
			suitableActTypes: suitableActTypes,
			title: title,
			description: description,
			frequency: frequency,
			rules: rules,
			photos: photos,
			experience: experience,
			genres: genres,
			reviews: reviews,
			overallRating: overallRating,
			bannerPhoto: bannerPhoto,
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

		const userProfile = await BaseUser.findById(req.body.userId)
		if (!userProfile) {
			errorHandler(404, ["Unable to retrieve your user profile"])
		}

		userProfile.userData = savedVenue._id
		userProfile.save()

		res.status(200).json({
			alert: "Sucessfully created your venue profile",
			type: req.body.userType.toLowerCase(),
			userData: savedVenue._id
		})
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
}

exports.getEditVenue = async (req, res, next) => {
	try  {
		const id = req.params.id
		const idType = req.query.idType || "_id"

		const venue = await Venue.findOne({[idType]: id})
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

		if (req.files) {
			const photoFiles = req.files.photoFiles

			if (Array.isArray(photoFiles)) {
				const photos = photoFiles.map(file => {
					return file.name
				})

				venue.photos = [...venue.photos, ...photos]
			} else {
				venue.photos = [...venue.photos, photoFiles.name]
			}
		}
		//store photo file somewhere, remove old photo

		venue.genres = req.body.venueData.genres
		venue.title = req.body.venueData.title
		venue.description = req.body.venueData.description
		venue.amenities = req.body.venueData.amenities
		venue.price = req.body.venueData.price
		venue.priceType = req.body.venueData.priceType
		venue.rules = req.body.venueData.rules

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
		console.log(req.body)
		const populate = {
			populate: {
				path: "userData",
				select: ["title", "overallRating", "price"]
			}
		}
		
		const offerorPromise = BaseUser.findOne({_id: req.body.offerorId}, "name userType", populate)
		const receiverPromise = BaseUser.findOne({userData: req.body.receiverId}, "name userType", populate)

		const result = await Promise.all([offerorPromise, receiverPromise])

		const [offeror, receiver] = result
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
		
		const booking = new Booking({
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
		const errors = validationResult(req);
		if (!req.files) {
			errors.errors.push({
				msg: "At least one photo of your act is required",
				param: "actData.photos"
			})
		}

		if (!errors.isEmpty()) {
			errorHandler(422, errors.array());
		}

		if (req.body.userType.toLowerCase() !== "act") {
			errorHandler("403", ["Incorrect user type"])
		}

		const checkForAct = await Act.findOne({userId: req.body.userId})

		if (checkForAct) {
			errorHandler("403", ["You already have act associated with your account"])
		}
		
		let photos;
		if (req.files.photos && !Array.isArray(req.files.photos)) {
			photos = req.files.photos.name
		}

		if (req.files.photos && Array.isArray(req.files.photos)) {
			photos = req.files.photos.map(file => {
				return file.name
			}) 
		} 
		//store photo file somewhere
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
			bannerPhoto,
			blogs,
			type
		} = req.body.actData

		const act = new Act({
			userId: req.body.userId,
			address: address,
			title: title,
			photos: photos,
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
			bannerPhoto: bannerPhoto,
			shows: [],
			blogs: blogs,
			type: type
		})

		const savedAct = await act.save()

		if (!savedAct) {
			errorHandler("500", ["Unable to store your act information"])
		}

		const userProfile = await BaseUser.findById(req.body.userId)
		if (!userProfile) {
			errorHandler(404, ["Unable to retrieve your user profile"])
		}

		userProfile.userData = savedAct._id
		userProfile.save()

		res.status(200).json({
			alert: "Sucessfully created your act profile",
			type: req.body.userType.toLowerCase(),
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
		const idType = req.query.idType || "_id"

		const act = await Act.findOne({[idType]: id })
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
			errorHandler(404, ["Your venue was unable to be retrieved"])
		}
		
		if (req.files.photoFiles) {
			const photoFiles = req.files.photoFiles

			if (Array.isArray(photoFiles)){
				const photos = photoFiles.map(file => {
					return file.name
				})

				act.photos = [...act.photos, ...photos]
			} else {
				act.photos = [...act.photos, photoFiles.name]
			}
		}
		//store photo file somewhere
		act.genres = req.body.actData.genres
		act.title = req.body.actData.title
		act.description = req.body.actData.description
		act.soundcloudLink = req.body.actData.soundcloudLink
		act.description = req.body.actData.description
		act.price = req.body.actData.price

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

exports.getBookingSummary = async (req, res, next) => {
	try {

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
		const idType = req.query.idType

    const show = await Show.findById(showId)
      .populate('show')
		
    if (!show) {
      errorHandler(404, ['Booking not found'])
    }  
		
		if (show[idType].toString() !== profileId.toString()) {
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

