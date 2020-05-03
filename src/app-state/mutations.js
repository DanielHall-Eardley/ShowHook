import router from "../router"

export default {
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
    console.log(state.searchQuery)
  },
  resetEdit: state => {
    state.profileCreationPage = 0
    state.profileCreationStep = 0
  },
  updateSearchResults: (state, payload) => {
    state.searchResults = payload.results
  },
  searchError: (state, payload) => {
    state.searchError = payload.messages
  },
  clearSearchError: state => {
    state.searchError = null
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
    console.log(state.searchQuery.genreFilters)
  },
  removeGenreFilter: (state, payload) => {
    console.log(payload)
    const updatedArray = state.searchQuery.genreFilters
    state.searchQuery.genreFilters = updatedArray.filter(el => el !== payload)
    console.log(state.searchQuery.genreFilters)
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
    console.log(state.searchQuery)
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
  }
}