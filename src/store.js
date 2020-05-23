import Vue from 'vue'
import Vuex from 'vuex'
import actions from "@/state/actions"
import mutations from "@/state/mutations"
import getters from "@/state/getters"
import state from "@/state/state"

Vue.use(Vuex)

export default new Vuex.Store({
  state: state(),
  getters,
  mutations,
  actions
})
