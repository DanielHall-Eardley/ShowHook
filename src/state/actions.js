import loginSignupFn from "../helper/loginSignupFn"
import postDataFn from "../helper/postDataFn"
import router from "../router"
import getDataFn from "../helper/getDataFn";

export default {
  signUp: async ({ commit }, payload) => {
    loginSignupFn(commit, payload, "signup");
  },
  login: async ({ commit }, payload) => {
    await loginSignupFn(commit, payload, "login", payload.redirect);

    setTimeout(() => {
      commit("logout")
    }, localStorage.getItem("expirationTime"))
  },
  autoLogin: ({ commit }, payload) => {
    const expiresIn = localStorage.getItem("expiresIn")

    return new Promise((resolve, reject) => {
      if (new Date() > new Date(expiresIn) || !expiresIn) {
        commit("logout")
        router.push({
          name: "admin",
          query: {
            type: "login",
            redirect: payload
          }
        })
        reject("Please log in")
      }
      commit("autoLogin")
      resolve("Autologin sucessful")
    })
  },
  deleteProfile: (context, payload) => {
    const token = context.rootState.baseUser.token

    if (!token) {
      context.dispatch("autoLogin", payload.fullPath)
    }
    alert(deleteFn("admin/delete-profile/" + payload.id + "/?deleteType=" + payload.deleteType, token))
    router.push("/")
  },
  createBlog: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload.path)
    }

    const body = JSON.stringify({
      title: payload.title,
      content: payload.content,
      imgUrl: payload.imgUrl,
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": "application/json"
    }

    const responseData = await postDataFn("admin/blog/" + userId, body, headers)

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    context.commit("updateBlogs", responseData)
  },
  getBlogs: async (context, payload) => {
    context.commit("clearError")

    const responseData = await getDataFn(`blogs/${payload.id}?page=${payload.page}&userType=${payload.userType}`)
 
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    context.commit("updateBlogs", responseData)
  },
  getBlogDetails: async (context, payload) => {
    context.commit("clearError")

    const responseData = await getDataFn(`blog/${payload.blogId}?&userType=${payload.userType}&profileId=${payload.profileId}`)
  
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    context.commit("updateSelectedBlog", responseData)
  },
  createBooking: async (context, payload) => {
    context.commit("clearError")

    if (!context.rootState.baseUser.userId) {
      context.dispatch("autoLogin", payload.path)
    }

    const offer = JSON.stringify({
      ...payload,
      offerorId: context.rootState.baseUser.userId
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": "application/json"
    }
    
    const responseData = await postDataFn("admin/create-offer", offer, headers)
    
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    router.push({
      name: "offer",
      params: {
        id: responseData.response
      }
    })
  },
  updateOffer: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload.path)
    }

    const body = JSON.stringify({
      status: payload.status,
      offerId: payload.offerId,
      userId: userId
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": "application/json"
    }

    const responseData = await postDataFn("update-offer-status", body, headers, "PUT")

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    context.commit("loadOffer", responseData)
  },
  deleteOffer: async (context, payload) => { 
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload.path)
    }

    const body = JSON.stringify({
      offerId: payload.offerId,
      userId: userId,
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": "application/json"
    }

    const responseData = await postDataFn("delete-offer", body, headers, "DELETE")

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    alert(responseData.response)
    router.push("/")
  },
  updateVenue: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload)
    }

    const { 
      genres,
      title,
      description,
      pricing,
      amenities,
      rules,
      photos
    } = context.rootState.venueData

    const photoFileArray = photos.filter(el => typeof el === "object")

    const venueData = JSON.stringify({
      genres,
      title,
      description,
      pricing,
      amenities,
      rules,
    })

    const formData = new FormData()
    formData.append("venueData", venueData)
    
    photoFileArray.forEach(photo => {
      formData.append("photoFiles", photo)
    })    

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
    }

    const responseData = await postDataFn("admin/update-venue/" + userId, formData, headers, "PUT")
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
    
    router.go()
  },
  updateAct: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload)
    }

    const {
      genres,
      title,
      description,
      souncloudLink,
      youtubeLink,
      photos
    } = context.rootState.actData

    const photoFileArray = photos.filter(el => typeof el !== "object")

    const actData = JSON.stringify({
      genres,
      title,
      description,
      souncloudLink,
      youtubeLink,  
    })

    const formData = new FormData()
    formData.append("actData", actData)
    photoFileArray.forEach(photo => {
      formData.append("photoFiles", photo)
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
    }

    const responseData = await postDataFn("admin/update-act/" + userId, formData, headers, "PUT")
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    router.go()
  },
  updateShowSetup: async (context, payload) => {
    context.commit('clearError')
    const userId = context.rootState.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload.redirect)
    }

    const body = context.rootState.showSetup
    body.offerId = payload.offerId
    body.userId = userId
    const stringifiedBody = JSON.stringify(body)

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": 'application/json'
    }

    const responseData = await postDataFn("update-show-setup", stringifiedBody, headers, "PUT")
    
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
  },
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
    context.commit("clearError")

    if (
      !context.rootState.baseUser.userId ||
      !context.rootState.baseUser
    ) {
      return router.push({
        name: "admin",
        query: {
          type: "login",
          redirect: "edit"
        }
      })
    }

    const user = context.rootState.baseUser
    const dataType = user.userType.toLowerCase() + "Data"
    const data = context.rootState[dataType]

    let formData = new FormData()
    formData.append("userId", user.userId)
    formData.append("userType", user.userType)
    formData.append(dataType, JSON.stringify(data))

    data.photos.forEach(photo => {
      formData.append("photos", photo)
    })

    const token = context.rootState.token
    const headers = {
      "Authorization": "Bearer " + token,
    }

    const responseData = await postDataFn("admin/" + user.userType.toLowerCase(), formData, headers)

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    context.commit("profileSuccess", responseData)
    context.commit("resetEdit")
  },
  searchResults: async (context, payload) => {
    context.commit("clearError")

    const headers = {
      "Content-Type": "application/json"
    }

    const keyword = context.rootState.searchQuery.keyword
    const location = context.rootState.searchQuery.location
    
    const query = JSON.stringify({
      keyword,
      location,
      page: payload.page
    })

    const responseData = await postDataFn("search", query, headers)

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
    
    context.commit("updateSearchResults", responseData)
    context.commit("resetSearchQuery")
  },
  refinedSearchResults: async (context, payload) => {
    context.commit("clearError")
    
    const token = context.rootState.token
    const userType = context.rootState.baseUser.userType

    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }

    const query = JSON.stringify({
      ...context.rootState.searchQuery,
      page: payload.page
    })

    const responseData = await postDataFn("search/" + userType.toLowerCase(), query, headers)

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    context.commit("updateSearchResults", responseData)
    context.commit("resetSearchQuery")
  },
  sendMessage: async (context, payload) => {
    context.commit("clearError")
    
    const token = context.rootState.token
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }

    const body = JSON.stringify({
      content: payload.content,
      name: context.rootState.baseUser.name,
      userId: context.rootState.baseUser.userId,
      offerId: payload.offerId
    })

    const responseData = await postDataFn(payload.messageType + "/send-message", body, headers)

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
  },
  finalizeOffer: async (context, payload) => {
    context.commit("clearError")
    
    const token = context.rootState.token
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }

    const body = JSON.stringify({
      userId: context.rootState.baseUser.userId,
      offerId: payload.offerId
    })

    const responseData = await postDataFn('finalize-offer', body, headers, 'PUT')

    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
  } 
}