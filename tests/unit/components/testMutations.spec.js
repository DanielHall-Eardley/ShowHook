import mutations from '@/state/mutations'
import { createLocalVue } from '@vue/test-utils'
import defaultState from '@/state/state'
import Vuex from 'vuex'
import state from '../../../src/state/state'

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

  it('test act profile load mutation', () => {
    store.commit("loadProfileData", {
      data: {_id: 'someId'},
      profileType: "actData"
    })

    expect(store.state.actData._id).toBeTruthy()
  })

  it('test booking summary load mutation', () => {
    store.commit("loadBookingSummary", {
      data: {_id: 'someId'},
    })

    expect(store.state.bookingSummary._id).toBeTruthy()
  })

  it('test update banner load mutation for venue profile', () => {
    store.state.baseUser.userType = 'Venue'
    const urlRegex = new RegExp('#\b(([\w-]+://?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/)))#i')

    store.commit("updateBannerPhoto", 'https://photo-storage.com')

    expect(store.state.venueData.bannerPhoto).toMatch(urlRegex)
  })
})
