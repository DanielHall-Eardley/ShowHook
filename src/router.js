import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import Help from './views/Help.vue'
import Profile from './views/Profile.vue'
import Home from './views/Home.vue'
import VenueProfile from './views/VenueProfile.vue'
import BookingDetails from './views/BookingDetails.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: LandingPage,
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
      path: "/booking",
      name: "booking",
      component: BookingDetails
    }
  ]
})
