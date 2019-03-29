import Vue from 'vue'
import Vuex from 'vuex'
import appConfig from "@/stateModules/appConfig.js"
import userConfig from "@/stateModules/userConfig.js"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    appConfig,
    userConfig,
  }
})
