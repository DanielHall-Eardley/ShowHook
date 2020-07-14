import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import LoginOrSignup from './views/LoginOrSignup.vue'
import Help from './views/Help.vue'
import Profile from './views/Profile.vue'
import Home from './views/Home.vue'
import VenueProfile from './views/VenueProfile.vue'
import ActProfile from './views/ActProfile.vue'
import EditDetails from './views/EditDetails.vue'
import SearchPage from './views/SearchPage.vue'
import ShowDetail from './views/ShowDetail.vue'
import PageNotFound from './views/PageNotFound.vue'
import BookingPage from './views/BookingPage'
import ReadBlog from './views/ReadBlog.vue'
import Checkout from './views/Checkout.vue'
import BookingSummaryPage from './views/BookingSummaryPage.vue'
import ShowSummaryPage from './views/ShowSummaryPage.vue'
import JoinAct from './views/JoinAct.vue'

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
      path: '/admin',
      component: LoginOrSignup,
      name: 'admin',
    }, 
    {
      path: '/help',
      component: Help
    },
    {
      path: "/blog/:blogId/:userType/:profileId",
      name: "blog",
      component: ReadBlog
    },
    {
      path: '/home/:search',
      component: Home
    },
    {
      path: '/admin/venue/:id',
      name: "admin-venue",
      component: VenueProfile
    },
    {
      path: '/venue/:id',
      name: "venue",
      component: VenueProfile
    },
    {
      path: '/admin/act/:id',
      name: "admin-act",
      component: ActProfile
    },
    {
      path: '/act/:id',
      name: "act",
      component: ActProfile
    },
    {
      path: "/edit",
      name: "edit",
      component: EditDetails,
    },
    {
      path: "/search",
      name: "search",
      component: SearchPage,
    },
    {
      path: "/page-not-found",
      name: "page-not-found",
      component: PageNotFound,
    },
    {
      path: "/booking/:id",
      name: "booking",
      component: BookingPage,
    },
    {
      path: "/booking/summary/:id",
      name: "booking-summary",
      component: BookingSummaryPage,
    },
    {
      path: "/show/summary/:id",
      name: "show-summary",
      component: ShowSummaryPage,
    },
    {
      path: "/show/:id",
      name: "show",
      component: ShowDetail,
    },
    {
      path: "/admin/show/:id",
      name: "admin-show",
      component: ShowDetail,
    },
    {
      path: "/admin/profile/:id",
      name: "admin-profile",
      component: Profile,
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: Profile,
    },
    {
      path: "/checkout/:type/:id",
      name: "checkout",
      component: Checkout,
    },
    {
      path: "/join-act/:id",
      name: "join-act",
      component: JoinAct,
    },
  ]
})
