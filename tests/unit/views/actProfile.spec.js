import { shallowMount, createLocalVue } from '@vue/test-utils'
import ActProfile from '@/views/ActProfile'
import Vuex from 'vuex'
import store from '@/store'
import defaultState from '@/state/state'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ActProfile.vue', () => {
  beforeEach(() => {
    store.replaceState(defaultState())
  })

  it('tests the created lifecycle receives correct params for route admin-act', () => {
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

    const wrapper = shallowMount(ActProfile, { 
      store, 
      localVue,
      mocks: {
        $route: $route
      }
    })
    console.log(wrapper.vm)
  })
})