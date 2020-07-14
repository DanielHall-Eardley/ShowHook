import loginSignupFn from "../helper/loginSignupFn"
import postDataFn from "../helper/postDataFn"
import router from "../router"
import getDataFn from "../helper/getDataFn";
import {format} from 'date-fns'

export default {
  signUp: async ({ commit }, payload) => {
    commit("clearError");
    const response = await loginSignupFn(payload, "/signup");

    if (response.error) {
      return commit("updateError", response);
    }

    localStorage.setItem('tempUserType', response.user.type)
    commit("signupSuccessful", {
      data: response,
      redirect: payload.redirect
    });
  },
  login: async ({ commit }, payload) => {
    commit("clearError");

    if (!payload.userType) {
      payload.userType = localStorage.getItem('tempUserType')
    }

    const response =  await loginSignupFn(payload, "/login");
    if (response.error) {
      return commit("updateError", response);
    }

    localStorage.clear()
    commit("loginSuccessful", {
      data: response,
      redirect: payload.redirect
    });
  },
  deleteProfile: (context, payload) => {
    const token = context.rootState.baseUser.token

    if (!token) {
      context.dispatch("autoLogin", payload.fullPath)
    }
    alert(deleteFn("/admin/delete-profile/" + payload.id + "/?deleteType=" + payload.deleteType, token))
    router.push("/")
  },
  createBlog: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    const body = JSON.stringify({
      title: payload.title,
      content: payload.content,
      imgUrl: payload.imgUrl,
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": "application/json"
    }

    const response = await postDataFn("/admin/blog/" + userId, body, headers)

    if (response.error) {
      return context.commit("updateError", response)
    }

    context.commit("updateBlogs", response)
  },
  getBlogs: async (context, payload) => {
    context.commit("clearError")

    const response = await getDataFn(`blogs/${payload.id}?page=${payload.page}&userType=${payload.userType}`)
 
    if (response.error) {
      return context.commit("updateError", response)
    }

    context.commit("updateBlogs", response)
  },
  getBlogDetails: async (context, payload) => {
    context.commit("clearError")

    const response = await getDataFn(`blog/${payload.blogId}?&userType=${payload.userType}&profileId=${payload.profileId}`)
  
    if (response.error) {
      return context.commit("updateError", response)
    }

    context.commit("updateSelectedBlog", response)
  },
  createBooking: async (context, payload) => {
    context.commit("clearError")
    
    const booking = JSON.stringify({
      ...payload,
      offerorId: context.rootState.baseUser.userId
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": "application/json"
    }
    
    const response = await postDataFn("/admin/booking/create", booking, headers)
    
    if (response.error) {
      return context.commit("updateError", response)
    }

    router.push({
      name: "booking",
      params: {
        id: response.response
      }
    })
  },
  updateBooking: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    const body = JSON.stringify({
      status: payload.status,
      bookingId: payload.bookingId,
      userId: userId
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": "application/json"
    }

    const response = await postDataFn("/booking/update/status", body, headers, "PUT")

    if (response.error) {
      return context.commit("updateError", response)
    }

    context.commit("loadBooking", response)
  },
  deleteBooking: async (context, payload) => { 
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    const body = JSON.stringify({
      bookingId: payload.bookingId,
      userId: userId,
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": "application/json"
    }

    const response = await postDataFn("/booking/delete", body, headers, "DELETE")

    if (response.error) {
      return context.commit("updateError", response)
    }

    alert(response.response)
    router.push("/")
  },
  updateVenue: async (context) => {
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    const { 
      genres,
      title,
      description,
      price,
      priceType,
      amenities,
      rules,
      photoUrlArray
    } = context.rootState.venueData

    const body = JSON.stringify({
      genres,
      title,
      description,
      amenities,
      rules,
      photoUrlArray,
      userId,
      price,
      priceType
    }) 

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      'Content-Type': 'application/json'
    }

    const response = await postDataFn("/admin/update-venue/" + userId, body, headers, "PUT")
    if (response.error) {
      return context.commit("updateError", response)
    }
    
    router.go()
  },
  updateAct: async (context) => {
    context.commit("clearError")
    const userId = context.rootState.baseUser.userId

    const {
      genres,
      title,
      description,
      souncloudLink,
      youtubeLink,
      photoUrlArray,
      price
    } = context.rootState.actData

    const body = JSON.stringify({
      genres,
      title,
      description,
      souncloudLink,
      youtubeLink,  
      userId,
      photoUrlArray,
      price
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      'Content-Type': 'application/json'
    }

    const response = await postDataFn("/admin/update-act/" + userId, body, headers, "PUT")
    if (response.error) {
      return context.commit("updateError", response)
    }

    router.go()
  },
  updateShowSetup: async (context, payload) => {
    context.commit('clearError')
    const userId = context.rootState.baseUser.userId

    const body = context.rootState.showSetup
    body.bookingId = payload.bookingId
    body.userId = userId
    const stringifiedBody = JSON.stringify(body)

    const headers = {
      "Authorization": "Bearer " + context.rootState.token,
      "Content-Type": 'application/json'
    }

    const response = await postDataFn("/booking/update/show-setup", stringifiedBody, headers, "PUT")
    
    if (response.error) {
      return context.commit("updateError", response)
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

    const user = context.rootState.baseUser
    const dataType = user.userType.toLowerCase() + "Data"
    const body = JSON.stringify({
      ...context.rootState[dataType], 
      userId: user.userId
    })

    const token = context.rootState.token
    const headers = {
      "Authorization": "Bearer " + token,
      'Content-Type': 'application/json'
    }

    const response = await postDataFn("/admin/" + user.userType.toLowerCase(), body, headers)

    if (response.error) {
      return context.commit("updateError", response)
    }

    context.commit("profileSuccess", response)
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

    const response = await postDataFn("/search", query, headers)

    if (response.error) {
      return context.commit("updateError", response)
    }
    
    context.commit("updateSearchResults", response)
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

    const response = await postDataFn("/search/" + userType.toLowerCase(), query, headers)

    if (response.error) {
      return context.commit("updateError", response)
    }

    context.commit("updateSearchResults", response)
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
      bookingId: payload.bookingId
    })

    const response = await postDataFn(payload.messageType + "/send-message", body, headers)

    if (response.error) {
      return context.commit("updateError", response)
    }
  },
  finalizeBooking: async (context, payload) => {
    context.commit("clearError")
    
    const token = context.rootState.token
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }

    const body = JSON.stringify({
      userId: context.rootState.baseUser.userId,
      bookingId: payload.bookingId,
      status: payload.status
    })

    const response = await postDataFn('/booking/finalize', body, headers, 'PUT')

    if (response.error) {
      return context.commit("updateError", response)
    }
  },
  checkLogin: context => {
    const expiresIn = localStorage.getItem("expiresIn")
    const now = format(new Date(), 'T')

    return new Promise((resolve, reject) => {
      if (now > expiresIn) {
        context.commit('logout')
        resolve(false)
      }
      context.commit('autoLogin')
      resolve(true)
    })
  },
  createBookingPayment: async (context, payload) => {
    const cb = (resolve, reject) => {

    }
    return new Promise(cb)
  }
}