import { shallowMount, createLocalVue } from '@vue/test-utils'
import ActProfile from '@/views/ActProfile'
import Vuex from 'vuex'
import storeConfig from '@/store'
import { cloneDeep } from 'lodash'
console.log(cloneDeep)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('ActProfile.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(storeConfig))

    console.log(store)
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
    console.log(wrapper)
  })
})