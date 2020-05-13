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
    const token = context.rootState.userConfig.baseUser.token

    if (!token) {
      context.dispatch("autoLogin", payload.fullPath)
    }
    alert(deleteFn("admin/delete-profile/" + payload.id + "/?deleteType=" + payload.deleteType, token))
    router.push("/")
  },
  createBlog: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.userConfig.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload.path)
    }

    const body = JSON.stringify({
      title: payload.title,
      content: payload.content,
      imgUrl: payload.imgUrl,
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.userConfig.token,
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
    console.log(responseData)
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    context.commit("updateBlogs", responseData)
  },
  getBlogDetails: async (context, payload) => {
    context.commit("clearError")

    const responseData = await getDataFn(`blog/${payload.blogId}?&userType=${payload.userType}&profileId=${payload.profileId}`)
    console.log(responseData)
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    context.commit("updateSelectedBlog", responseData)
  },
  createBooking: async (context, payload) => {
    context.commit("clearError")

    if (!context.rootState.userConfig.baseUser.userId) {
      context.dispatch("autoLogin", payload.path)
    }

    const offer = JSON.stringify({
      ...payload,
      offerorId: context.rootState.userConfig.baseUser.userId
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.userConfig.token,
      "Content-Type": "application/json"
    }
    
    const responseData = await postDataFn("admin/create-offer", offer, headers)
    
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
    console.log('offer', responseData)
    router.push({
      name: "offer",
      params: {
        id: responseData.response
      }
    })
  },
  updateOffer: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.userConfig.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload.path)
    }

    const body = JSON.stringify({
      status: payload.status,
      offerId: payload.offerId,
      userId: userId
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.userConfig.token,
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
    const userId = context.rootState.userConfig.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload.path)
    }

    const body = JSON.stringify({
      offerId: payload.offerId,
      userId: userId,
    })

    const headers = {
      "Authorization": "Bearer " + context.rootState.userConfig.token,
      "Content-Type": "application/json"
    }

    const responseData = await postDataFn("delete-offer", body, headers, "DELETE")

    if (responseData.messages) {
      return context.commit("updateError", responseData.messages)
    }

    alert(responseData.response)
    router.push("/")
  },
  updateVenue: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.userConfig.baseUser.userId

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
    } = context.rootState.userConfig.venueData

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
      "Authorization": "Bearer " + context.rootState.userConfig.token,
    }

    const responseData = await postDataFn("admin/update-venue/" + userId, formData, headers, "PUT")
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
    
    router.go()
  },
  updateAct: async (context, payload) => {
    context.commit("clearError")
    const userId = context.rootState.userConfig.baseUser.userId

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
    } = context.rootState.userConfig.actData

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
      "Authorization": "Bearer " + context.rootState.userConfig.token,
    }

    const responseData = await postDataFn("admin/update-act/" + userId, formData, headers, "PUT")
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }

    router.go()
  },
  updateShowSetup: async (context, payload) => {
    context.commit('clearError')
    const userId = context.rootState.userConfig.baseUser.userId

    if (!userId) {
      context.dispatch("autoLogin", payload.redirect)
    }

    const body = context.rootState.userConfig.showSetup
    body.offerId = payload.offerId
    body.userId = userId
    const stringifiedBody = JSON.stringify(body)

    const headers = {
      "Authorization": "Bearer " + context.rootState.userConfig.token,
    }

    const responseData = await postDataFn("/update-show-setup", stringifiedBody, headers, "PUT")
    
    if (responseData.messages) {
      return context.commit("updateError", responseData)
    }
  }
}