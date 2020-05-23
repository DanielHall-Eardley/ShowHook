import { shallowMount, createLocalVue } from '@vue/test-utils'
import ActProfile from '@/views/ActProfile'
import Vuex from 'vuex'
import defaultState from '@/state/state'

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
  autoLogin: jest.fn(),
  updateAct: jest.fn(),
  deleteProfile: jest.fn()
}

const mutations = {
  clearError: jest.fn(),
  updateError: jest.fn(),
  loadProfileData: jest.fn()
}

const store = new Vuex.Store({
  actions,
  mutations,
  state: defaultState()
})

const $route = {
  params: {
    id: "id",
  },
  query: {
    idType: 'userId'
  },
  name: 'admin-act',
  fullPath: 'some/path'
}

describe('ActProfile.vue', () => {
  beforeEach(() => {
    store.replaceState(defaultState())
  })

  it('tests components created lifecycle hook', () => {
    const wrapper = shallowMount(ActProfile, { 
      store,
      localVue,
      mocks: {
        $route: $route
      }
    })
    
    expect(mutations.loadProfileData).toBeCalled()
    expect(mutations.clearError).toBeCalled()
    expect(actions.autoLogin).toBeCalled()
  })

  it('tests updateAct method', async () => {
    const wrapper = shallowMount(ActProfile, { 
      store,
      localVue,
      mocks: {
        $route: $route
      }
    })

    const button = wrapper.find('#update-act')
    await button.trigger('click')
    expect(mutations.updateAct).toBeCalled()
  })
})