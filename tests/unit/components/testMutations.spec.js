import mutations from '@/state/mutations'
import { createLocalVue } from '@vue/test-utils'
import defaultState from '@/state/state'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  mutations,
  state: defaultState()
})

describe('Test mutations', () => {

  beforeEach(() => {
    store.replaceState(defaultState())
  })

  it('tests act profile load function', () => {
    store.commit("loadProfileData", {
      data: {_id: 'someId'},
      profileType: "actData"
    })

    expect(store.state.actData._id).toBeTruthy()
  })
})
