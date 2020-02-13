import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from "vuelidate"
import UUID from "vue-uuid"
import { sync } from "vuex-router-sync"

Vue.use(Vuelidate)
Vue.use(UUID)

sync(store, router)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
