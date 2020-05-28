import mutations from '@/state/mutations'
import { createLocalVue } from '@vue/test-utils'
import defaultState from '@/state/state'
import Vuex from 'vuex'
import router from "@/router"

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
    store.commit("loadShow", {
      booking: {_id: 'someId'},
      show: {_id: 'someId'},
    })

    expect(store.state.show._id).toBeTruthy() && expect(store.state.show.showDetails).toBeTruthy()
  })

  it('test update guest list mutation', () => {
    const payload = 'daniel'
    
    const newArrayLength = store.state.showSetup.guestList.length + 1
    store.commit('updateGuestList', payload)
    
    expect(store.state.showSetup.guestList.length).toEqual(newArrayLength)
    expect(store.state.showSetup.guestList).toContain(payload)
  })

  it('test act update condition list mutation', () => {
    const payload = {
      userType: 'Act',
      condition: 'some condition'
    }
    
    const newArrayLength = store.state.showSetup.actRequirements.length + 1
    store.commit('updateConditionList', payload)
    
    expect(store.state.showSetup.actRequirements.length).toEqual(newArrayLength)
    expect(store.state.showSetup.actRequirements).toContain(payload.condition)
  })

  it('test venue update condition list mutation', () => {
    const payload = {
      userType: 'Venue',
      condition: 'some condition'
    }
    
    const newArrayLength = store.state.showSetup.venueRequirements.length + 1
    store.commit('updateConditionList', payload)
    
    expect(store.state.showSetup.venueRequirements.length).toEqual(newArrayLength)
    expect(store.state.showSetup.venueRequirements).toContain(payload.condition)
  })

  it('test update booking message list mutation', () => {
    const payload = 'some new message'
    
    const newArrayLength = store.state.booking.messageArray.length + 1
    store.commit('loadBookingMessage', payload)
    
    expect(store.state.booking.messageArray.length).toEqual(newArrayLength)
    expect(store.state.booking.messageArray).toContain(payload)
  })

  it('test profile success mutation sets profile id on baseuser', () => {
    window.alert = jest.fn()
    store.state.baseUser.userId = "a userId"
    const payload = {
      userData: 'some profile id',
      type: 'act'
    }

    store.commit('profileSuccess', payload)

    expect(store.state.baseUser.userData).toBeTruthy()
    window.alert.mockClear()
  })

  it('test the profile success mutation loads the correct url', () => {
    window.alert = jest.fn()
    store.state.baseUser.userId = "a userId"
    const payload = {
      userData: 'some profile id',
      type: 'act'
    }

    store.commit('profileSuccess', payload)

    const urlName = new RegExp('admin-' + payload.type)
    expect(router.history.current.name).toMatch(urlName)
    window.alert.mockClear()
  })

  it('test add legal agreement to venuedata mutation', () => {
    const payload = true
    store.state.baseUser.userType = 'Venue'
    store.commit('addLegalAgreement', payload)

    expect(store.state.venueData.legalAgreement).toBeTruthy()
  })

  it('test add legal agreement to actData mutation', () => {
    const payload = true
    store.state.baseUser.userType = 'Act'
    store.commit('addLegalAgreement', payload)

    expect(store.state.actData.legalAgreement).toBeTruthy()
  })

  it('test add venue amenities mutation', () => {
    const payload = {
      key1: 'some property1',
      key2: 'some property2',
      key3: 'some property3'
    }
    const array = []
    const objKeys = Object.keys(payload)
    objKeys.forEach(key => {
      array.push(payload[key])
    })

    store.commit('addVenueAmenities', payload)

    expect(store.state.venueData.amenities).toEqual(expect.arrayContaining(array))
    expect(store.state.venueData.amenities.length).toEqual(array.length)
  })

  it('test add venue details mutation', () => {
    const payload = {
      type: "payload type",
      bathrooms:'payload bathrooms',
      bathroomType: 'payload bathroomType',
      capacity: 'payload capacity'
    }

    store.commit('addVenueDetails', payload)

    expect(store.state.venueData.type).toMatch(payload.type)
    expect(store.state.venueData.bathrooms).toMatch(payload.bathrooms)
    expect(store.state.venueData.bathroomType).toMatch(payload.bathroomType)
    expect(store.state.venueData.capacity).toMatch(payload.capacity)
  })

  it('test add address mutation', () => {
    store.state.baseUser.userType = "Act"

    const payload = {
      data: {
        id: 'id'
      }
    }

    store.commit('addAddress', payload)

    expect(store.state.actData.address.id).toBeTruthy()
  })

  it('test add genre mutation', () => {
    store.state.baseUser.userType = "Act"

    const payload = {
      data: 'Rock'
    }

    store.commit('addGenre', payload)

    const genreArray = store.state.actData.genres
    expect(genreArray[genreArray.length - 1]).toMatch(payload.data)
  })

  it('test remove genre mutation', () => {
    store.state.baseUser.userType = "Act"
    store.state.actData.genres = ['Pop', 'Rock', 'Edm']

    const payload = {
      data: 'Rock'
    }

    store.commit('removeGenre', payload)

    expect(store.state.actData.genres).not.toContain(payload.data)
  })

  it('test add photo mutation', () => {
    store.state.baseUser.userType = "Act"

    const payload = {
      photos: [
        {fileName: 'photo.jpg'},
        {fileName: 'photo.jpg'},
      ]
    }
    const combinedArrayLength = store.state.actData.photos.length + payload.length
    store.commit('addPhotos', payload)

    expect(store.state.actData.photos.length).toEqual(combinedArrayLength)
  })

  it('test load show summary mutation', () => {
    const payload = {
      showList: [
        {id: "show id"},
        {id: "show id"}
      ]
    }

    store.commit('loadShowSummary', payload)

    expect(store.state.showSummary).toEqual(expect.arrayContaining(payload.showList))
  })
})
