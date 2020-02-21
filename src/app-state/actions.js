import postDataFn from "../helper/postDataFn"
import router from "../router"

export default {
  changeStepOrPage: (context, payload) => {
    let {
      profileCreationPage,
      profileCreationStep,
    } = context.state

    const userType = context.state.selectedUserType

    let stepsLength = context.state[userType].length - 1
    let pagesLength = context.state[userType][profileCreationStep].pages.length - 1

    if (payload === "inc") {
      if (profileCreationPage >= pagesLength && profileCreationStep >= stepsLength) {
        return context.dispatch("submitProfile")
      } else if (profileCreationPage >= pagesLength) {
        profileCreationStep++
        profileCreationPage = 0
      } else if (profileCreationPage <= pagesLength) {
        profileCreationPage++
      }
    } else if (payload === "dec") {
      if (profileCreationPage <= 0 && profileCreationStep <= 0) {
        return
      } else if (profileCreationPage <= 0) {
        profileCreationPage = context.state[userType][profileCreationStep - 1].pages.length - 1
        profileCreationStep--
      } else if (profileCreationPage >= 0) {
        profileCreationPage--
      }
    }

    context.commit("changeStepOrPage", {
      profileCreationPage,
      profileCreationStep
    })
  },
  submitProfile: async (context) => {
    context.commit("clearProfileError")

    if (
      !context.rootState.userConfig.baseUser.userId ||
      !context.rootState.userConfig.baseUser
    ) {
      return router.push({
        name: "admin",
        query: {
          type: "login",
          redirect: "edit"
        }
      })
    }

    const user = context.rootState.userConfig.baseUser
    const dataType = user.userType.toLowerCase() + "Data"
    const data = context.rootState.userConfig[dataType]

    let formData = new FormData()
    formData.append("userId", user.userId)
    formData.append("userType", user.userType)
    formData.append(dataType, JSON.stringify(data))

    data.photos.forEach(photo => {
      formData.append("photos", photo)
    })

    const token = context.rootState.userConfig.token
    const headers = {
      "Authorization": "Bearer " + token,
    }

    const responseData = await postDataFn("admin/" + user.userType.toLowerCase(), formData, headers)

    if (responseData.messages) {
      return context.commit("profileError", responseData)
    }

    context.commit("profileSuccess", responseData)
    context.commit("resetEdit")
  },
  searchResults: async (context, payload) => {
    context.commit("clearError")

    const headers = {
      "Content-Type": "application/json"
    }

    const keyword = context.rootState.appConfig.searchQuery.keyword
    const location = context.rootState.appConfig.searchQuery.location
    console.log(payload.page)
    const query = JSON.stringify({
      keyword,
      location,
      page: payload.page
    })

    const responseData = await postDataFn("search", query, headers)

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
    console.log(responseData)
    context.commit("updateSearchResults", responseData)
    context.commit("resetSearchQuery")
  },
  refinedSearchResults: async (context, payload) => {
    context.commit("clearError")
    
    const token = context.rootState.userConfig.token
    const userType = context.rootState.userConfig.baseUser.userType

    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }

    const query = JSON.stringify({
      ...context.rootState.appConfig.searchQuery,
      page: payload.page
    })

    const responseData = await postDataFn("search/" + userType.toLowerCase(), query, headers)

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
    console.log(responseData)

    context.commit("updateSearchResults", responseData)
    context.commit("resetSearchQuery")
  }  
}