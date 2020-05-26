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

    store.commit("updateBannerPhoto", 'https://photo-storage.com')

    expect(store.state.venueData.bannerPhoto).toBeTruthy()
  })

  it('test update banner load mutation for act profile', () => {
    store.state.baseUser.userType = 'Act'

    store.commit("updateBannerPhoto", 'https://photo-storage.com')

    expect(store.state.actData.bannerPhoto).toBeTruthy()
  })

  it('test booking load mutation', () => {
    store.commit("loadBooking", {
      booking: {_id: 'someId'},
    })

    expect(store.state.booking._id).toBeTruthy()
  })

  it('test booking load mutation with show setup', () => {
    store.commit("loadBooking", {
      booking: {_id: 'someId'},
      show: {_id: 'someId'},
    })

    expect(store.state.booking._id).toBeTruthy() && expect(store.state.showSetup._id).toBeTruthy()
  })

  it('test show load mutation', () => {
    store.commit("loadBooking", {
      booking: {_id: 'someId'},
      show: {_id: 'someId'},
    })

    expect(store.state.booking._id).toBeTruthy() && expect(store.state.showSetup._id).toBeTruthy()
  })
})
