const BaseUser = require("../models/baseUser")
const Showgoer = require("../models/showgoer")

const checkUserType = async (profileType, userId, selectedFields=[]) => {
  let userPromise;
  const removeUserFields = ['-email', '-password']

  if (!profileType) {
    const userActVenuePromise = BaseUser.findById(userId, removeUserFields)
    const userShowgoerPromise = Showgoer.findById(userId, removeUserFields)
    const [actOrVenue, showgoer] = await Promise.all([userActVenuePromise, userShowgoerPromise])
  
    if (!actOrVenue && showgoer) {
      return showgoer
    } 

    if (actOrVenue && !showgoer) {
      return actOrVenue
    }
  }

  if (profileType.toLowerCase() === 'showgoer') {
    userPromise = Showgoer.findById(userId, removeUserFields)
  } else {
    userPromise = BaseUser.findById(userId, removeUserFields)
    .populate({path: 'userData', select: selectedFields})
  }
  return userPromise
}

module.exports = checkUserType