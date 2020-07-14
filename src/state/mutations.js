import router from "../router"

export default {
  loadProfileData: (state, payload) => {
    state[payload.profileType] = payload.data
  },
  loadBookingSummary: (state, payload) => {
    state.bookingSummary = payload.data
  },
  updateBannerPhoto: (state, payload) => {
    const type = state.baseUser.userType.toLowerCase() + 'Data'
    state[type].bannerPhoto = payload
  },
  loadBooking: (state, payload) => {
    state.booking = {...state.booking, ...payload.booking}
    if (payload.show) {
      state.showSetup = {...state.showSetup, ...payload.show}
    }
  },
  loadShow: (state, payload) => {
    state.show = payload.show
  },
  updateGuestList: (state, payload) => {
    state.showSetup.guestList = [...state.showSetup.guestList, payload]
  },
  updateConditionList: (state, payload) => {
    const key = payload.userType.toLowerCase() + 'Requirements'
    state.showSetup[key] = [...state.showSetup[key], payload.condition]
  },
  loadBookingMessage: (state, payload) => {
    state.booking.messageArray = [...state.booking.messageArray, payload]
  },
  getVideo: state => {
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${state.user.video.videoId}&key=${key.youtube}`
    )
      .then(res => res.json)
      .then(res => console.log(res));
  },
  profileSuccess: (state, payload) => {
    alert(payload.alert)
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
    const amenitiesArray = []
    const keysArray = Object.keys(payload)

    for (let key of keysArray) {
      if (payload[key]) {
        amenitiesArray.push(payload[key])
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
  },
  addGenre: (state, payload) => {
    const type = state.baseUser.userType.toLowerCase() + "Data"
    state[type].genres = [...state[type].genres, payload.data]
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
    state[type].photoUrlArray = [...state[type].photoUrlArray, ...payload.photoUrlArray]
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
  updateShowSetup: (state, payload) => {
    state.showSetup[payload.key] = payload.value;
  },
  updateShowProfits: (state, payload) => {
    state.showSetup.actProfit = payload.actProfit
    state.showSetup.venueProfit = payload.venueProfit
  },
  updateSchedule: (state, payload) => {
    state.showSetup.schedule[payload.currentTask][payload.timeType] = payload.time
  },
  toggleArtistVenue: (state, payload) => {
    state.booking[payload.name] = payload.type;
  },
  loginSuccessful: (state, payload) => {
    localStorage.setItem("token", payload.data.token)
    localStorage.setItem("expiresIn", payload.data.expiresIn);
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
  updateError: (state, error) => {
    state.error = error;
  },
  clearError: state => {
    state.error = null;
  },
  autoLogin: state => {
    const baseUser = {
      userId: localStorage.getItem("baseUserId"),
      userType: localStorage.getItem("baseUserType"),
      name: localStorage.getItem("baseUserName"),
      userData: localStorage.getItem("baseUserData")
    }

    state.token = localStorage.getItem("token")
    state.baseUser = baseUser
  },
  logout: state => {
    state.token = null
    state.baseUser = null;
    localStorage.clear()
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
  },
  selectUserType: (state, payload) => {
    state.selectedUserType = payload.toLowerCase() + "ProfileCreation"
  }, 
  changeStepOrPage: (state, payload) => {
    state.profileCreationPage = payload.profileCreationPage
    state.profileCreationStep = payload.profileCreationStep
  },
  addArrayFilter: (state, payload) => {
    const checked = payload.checked
    const title = payload.title
    let updatedArray = state.searchQuery[payload.arrayType]

    if (checked) {
      updatedArray = [...updatedArray, title]
      return state.searchQuery[payload.arrayType] = updatedArray
    }

    updatedArray = updatedArray.filter(el => el !== title)
    state.searchQuery[payload.arrayType] = updatedArray
  },
  resetEdit: state => {
    state.profileCreationPage = 0
    state.profileCreationStep = 0
  },
  updateSearchResults: (state, payload) => {
    state.searchResults = payload.results
  },
  resetSearchQuery: state => {
    state.searchQuery = {
      keyword: null,
      location: null,
      type: null,
      priceType: null,
      genreFilters: [],
      actFilters: [],
      venueFilters: [],
      priceRange: {
        min: null,
        max: null
      },
      dateRange: {
        start: null,
          end: null
      }
    }
  },
  addGenreFilter: (state, payload) => {
    const updatedArray = state.searchQuery.genreFilters
    state.searchQuery.genreFilters = [...updatedArray, payload]
  },
  removeGenreFilter: (state, payload) => {
    const updatedArray = state.searchQuery.genreFilters
    state.searchQuery.genreFilters = updatedArray.filter(el => el !== payload)
  },
  profileError: (state, payload) => {
    state.profileCreationPage = 0
    state.profileCreationStep = 0

    if (!payload.messages[0].param) {
      alert(payload.messages[0])
      return 
    }

    const array = state[state.selectedUserType]
    array.forEach(step => {
      step.pages.forEach(page => {
        let name = ""
        payload.messages.forEach(err => {
          name = err.param.split(".")[1].toLowerCase()
          if (name === "title" || name === "suitableActTypes") {
            name = "description"
          } else if (name === "experience" || name === "frequency") {
            name = "preferences"
          } else if (
            name === "venueType" ||
            name === "guestLimit" ||
            name === "numberOfBathrooms" ||
            name === "bathroomType"
          ) {
            name = "details"
          }

          if (page.name.toLowerCase() === name) {
            return page.error = err.msg
          }
        })
      })
    })

    state.profileErrorArray = array
  },
  clearProfileError: (state) => {
    state.profileError = null
    const array = state[state.selectedUserType]
    array.forEach(step => {
      step.pages.forEach(page => {
        page.error = null
      })
    })
    state.profileErrorArray = array
  },
  addSingleFilter: (state, payload) => {
    state.searchQuery[payload.key] = payload.value
  },
  addRangedFilter: (state, payload) => {
    if (payload.resetRangedFilter) {
      if (payload.type === "dateRange") {
        state.searchQuery[payload.type].start = null
        state.searchQuery[payload.type].end = null
        return
      } 

      state.searchQuery[payload.type].min = null
      state.searchQuery[payload.type].max = null
      return
    }

    state.searchQuery[payload.type][payload.key] = payload.value
    console.log(state.searchQuery)
  },
  addPriceType: (state, payload) => {
    state.searchQuery.priceType = payload.value
  },
  createNameSpaces: (state, payload) => {
    state.namespaces = payload
  },
  loadShowSummary: (state, payload) => {
    state.showSummary = payload.showList
  },
  clearBookingState: state => {
    state.booking = {
      _id: null,
      offerorId: null,
      receiverId: null,
      offerorName: "",
      offerorTitle: "",
      offerorRating: "",
      receiverName: "",
      receiverTitle: "",
      receiverRating: "",
      bookingDate: "",
      price: 0,
      status: "Pending",
      messageArray: [],
    }
    state.showSetup = {
      _id: null,
      title: null,
      description: null,
      price: null,
      priceType: 'Fixed',
      ticketPrice: null,
      actProfit: 50,
      venueProfit: 50,
      schedule: {
        'Load In': {
          start: null,
          end: null
        },
        'Set Up': {
          start: null,
          end: null
        },
        'Openers': {
          start: null,
          end: null
        },
        'Main Event': {
          start: null,
          end: null
        },
        'Teardown': {
          start: null,
          end: null
        },
        'Load Out': {
          start: null,
          end: null
        },
      },
      guestList: [],
      actRequirements: [],
      venueRequirements: [],
      numberOfTickets: null
    }
  },
  loadTicket: (state, payload) => {
    state.ticket = payload.ticket
  }
}