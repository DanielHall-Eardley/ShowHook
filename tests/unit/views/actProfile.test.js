import { shallowMount, createLocalVue } from '@vue/test-utils'
import ActProfile from '@/views/ActProfile'
import Vuex from 'vuex'
import cloneStore from '@/store'
import cloneDeep from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ActProfile.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(cloneStore))
  })

  it('tests the created lifecycle method is functioning correctly', () => {
    const wrapper = shallowMount(ActProfile, { store, localVue })
    console.log(wrapper)
  })
})