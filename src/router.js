import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import Help from './views/Help.vue'
import Profile from './views/Profile.vue'
import Home from './views/Home.vue'
import VenueProfile from './views/VenueProfile.vue'
import BandProfile from './views/BandProfile.vue'
import EditDetails from './views/EditDetails.vue'
import PageTemplate from './views/PageTemplate.vue'
import SearchPage from './views/SearchPage.vue'
import OfferPage from './views/OfferPage.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: LandingPage,
      name: 'landing'
    },
    {
      path: '/help',
      component: Help
    },
    {
    path: '/profile/:id',
    component: Profile
    },
    {
      path: '/home/:search',
      component: Home
    },
    {
      path: '/venue/:id',
      component: VenueProfile
    },
    {
      path: '/band/:id',
      component: BandProfile
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditDetails,
    },
    {
      path: "/search",
      name: "search",
      component: SearchPage,
    },
    {
      path: "/offer/:id",
      name: "offer",
      component: OfferPage,
    }
  ]
})
