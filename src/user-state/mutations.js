import router from "../router"

export default {
  loadProfileData: (state, payload) => {
    state[payload.profileType] = payload.data
  },
  loadOfferSummary: (state, payload) => {
    state.offerSummary = payload.data
  },
  updateBannerPhoto: (state, payload) => {
    state.venueData.bannerPhoto = payload
  },
  loadOffer: (state, payload) => {
    state.offer = {...state.offer, ...payload.offer}
    state.showSetup = payload.show
  },
  loadOfferMessage: (state, payload) => {
    state.offer.messageArray = [...state.offer.messageArray, payload]
  },
  getVideo: state => {
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${state.user.video.videoId}&key=${key.youtube}`
    )
      .then(res => res.json)
      .then(res => console.log(res));
  },
  profileSuccess: (state, payload) => {
    alert(payload.alert || "Profile creation failed")
    state.baseUser.userData = payload.userData
    localStorage.setItem('baseUserData', payload.userData)
    
    router.push({
      name: 'admin-' + payload.type,
      params: {
        id: state.baseUser.userId
      },
      query: {
        idType: "userId"
      }
    })
  },
  addLegalAgreement: (state, payload) => {
    const type = state.baseUser.userType.toLowerCase() + "Data"
    state[type].legalAgreement = payload
  },
  addVenueAmenities: (state, payload) => {
    let amenitiesArray = []

    for (let a in payload) {
      if (payload[a]) {
        amenitiesArray.push(a)
      }
    }

    state.venueData.amenities = amenitiesArray
  },
  addVenueDetails: (state, payload) => {
    state.venueData.type = payload.type
    state.venueData.bathrooms = payload.bathrooms
    state.venueData.bathroomType = payload.bathroomType
    state.venueData.capacity = payload.capacity
  },
  addAddress: (state, payload) => {
    const type = state.baseUser.userType.toLowerCase() + "Data"
    state[type].address = payload.data
    console.log(state[type])
  },
  addGenre: (state, payload) => {
    const type = state.baseUser.userType.toLowerCase() + "Data"
    state[type].genres.push(payload.data)
  },
  removeGenre: (state, payload) => {
    const type = state.baseUser.userType.toLowerCase() + "Data"
    const filteredArray = state[type].genres.filter(el => {
      return el !== payload.data
    })

    state[type].genres = filteredArray
  },
  addPhotos: (state, payload) => {
    const type = state.baseUser.userType.toLowerCase() + "Data"
    state[type].photos = [...state[type].photos, ...payload.photos]
  },
  updateBlogs: (state, payload) => {
    const type = payload.userType.toLowerCase() + "Data"

    state[type].blogs = payload.blogs
  },
  updateSelectedBlog: (state, payload) => {
    state.selectedBlog = payload.blog
  },
  addVenueDescription: (state, payload) => {
    state.venueData.title = payload.listingTitle
    state.venueData.description = payload.venueDescription

    const suitableActTypesArray = []

    for (let actType in payload.suitableActTypes) {
      if (payload.suitableActTypes[actType]) {
        suitableActTypesArray.push(actType)
      }
    }

    state.venueData.suitableActTypes = suitableActTypesArray
  },
  addLinks: (state, payload) => {
    const type = state.baseUser.userType.toLowerCase() + "Data"
    const linkType = payload.name + "Link"

    state[type][linkType] = payload.value
  },
  addActFees: (state, payload) => {
    state.actData.fees[payload.name] = payload.value
    console.log (state.actData)
  },
  addActType: (state, payload) => {
    state.actData.type = payload
    console.log(state.actData)
  },
  addVenuePreferences: (state, payload) => {
    state.venueData[payload.name] = payload.value
  },
  addPricing: (state, payload) => {
    const type = state.baseUser.userType.toLowerCase() + "Data"
    state[type][payload.key] = payload.value
  },
  addVenueRules: (state, payload) => {
    let updatedArray = state.venueData.rules

    if (updatedArray.length < 1) {
      return updatedArray.push(payload)
    }

    let checkForRule = false

    for (let r of updatedArray) {
      if (r.rule === payload.rule) {
        r.enforced = payload.enforced
        checkForRule = true
      }
    }

    if (!checkForRule) {
      updatedArray.push(payload)
    }

    state.venueData.rules = updatedArray
    console.log(state.venueData)
  },
  addActReqOrPref: (state, payload) => {
    let reqArray = state.actData.requirements
    let prefArray = state.actData.preferences

    let getLength = reqArray.length

    if (prefArray.length > reqArray.length) {
      getLength = prefArray.length
    }

    let shouldPush = true
    for(let i = 0; i < getLength; i++) {
      if (reqArray[i] === payload.value && payload.type === "requirement") {
        return
      }

      if (prefArray[i] === payload.value && payload.type === "preference") {
        return
      }

      if (reqArray[i] === payload.value && payload.type === "preference") {
        reqArray = [...reqArray.slice(0, i), ...reqArray.slice(i + 1)]
        prefArray.push(payload.value)
        shouldPush = false
        break
      }

      if (prefArray[i] === payload.value && payload.type === "requirement") {
        prefArray = [...prefArray.slice(0, i), ...prefArray.slice(i + 1)]
        reqArray.push(payload.value)
        shouldPush = false
        break
      }
    }

    if (shouldPush && payload.type === "requirement") {
      reqArray.push(payload.value)
    }

    if (shouldPush && payload.type === "preference") {
      prefArray.push(payload.value)
    }

    state.actData.preferences = prefArray
    state.actData.requirements = reqArray
  },
  addActBio: (state, payload) => {
    state.actData.description = payload.bio
    state.actData.title = payload.title
  },
  updateOffer: (state, payload) => {
    state.offer[payload.name] = payload.value;
  },
  updateSchedule: (state, payload) => {
    state.offer.schedule.map(el => {
      if (el.task === payload.currentTask) {
        el[payload.time.name] = payload.time.value;
      }
      return el;
    });
  },
  toggleArtistVenue: (state, payload) => {
    state.offer[payload.name] = payload.type;
    console.log(state.offer[payload.name]);
  },
  loginSuccessful: (state, payload) => {
    const expirationDate = new Date(Date.now() + payload.data.expiresIn)
    localStorage.setItem("token", payload.data.token)
    localStorage.setItem("expiresIn", expirationDate);
    localStorage.setItem("expirationTime", payload.data.expiresIn);
    localStorage.setItem("baseUserId", payload.data.baseUser.userId);
    localStorage.setItem("baseUserName", payload.data.baseUser.name);
    localStorage.setItem("baseUserType", payload.data.baseUser.userType);
    localStorage.setItem("baseUserData", payload.data.baseUser.userData);
    state.token = payload.data.token
    state.baseUser = payload.data.baseUser

    if (payload.redirect) {
      return router.push({ path: payload.redirect })
    }

    router.push({ path: "/" });
  },
  signupSuccessful: (state, payload) => {
    router.push({ path: "admin", query: { type: "login" } });
  },
  updateError: (state, payload) => {
    state.error = payload.messages;
  },
  clearError: state => {
    state.error = null;
  },
  logout: state => {
    console.log("logged out")
    state.token = null
    state.baseUser = null;
    localStorage.clear()
  },
  autoLogin: state => {
    state.token = localStorage.getItem("token")

    const baseUser = {
      userId: localStorage.getItem("baseUserId"),
      userType: localStorage.getItem("baseUserType"),
      name: localStorage.getItem("baseUserName"),
      userData: localStorage.getItem("baseUserData")
    }

    state.baseUser = baseUser
  },
  editProfile: (state, payload) => {
    const key = payload.name
    const value = payload.value
    const type = state.baseUser.userType.toLowerCase() + "Data"

    if (Array.isArray(state[type][key])) {
      const filteredArray = state[type][key]

      for (let i = 0; i < filteredArray.length; i++) {
        if (value.toLowerCase() === filteredArray[i].toLowerCase()) {
          return filteredArray.splice(i, 1)
        }
      }

      filteredArray.push(value)
      return state[type][key] = filteredArray
    }

    state[type][key] = value
  }
}