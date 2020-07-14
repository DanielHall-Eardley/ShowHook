<template lang="html">
  <main class="show-details">
    <Menu/>
    <Error/>
    <Banner 
      :photoUrl='show.bannerPhoto' 
      :editable='editable'
      :photoArray='show.photoArray'>
    </Banner>
    <ShowHeader :show='show'></ShowHeader>
    <AdminDetails :show='show' :editable='editable'></AdminDetails>
    <Map 
      :name="show.venueTitle"
      :address='show.address'>
    </Map>
  </main>
</template>

<script>
import Menu from '@/components/shared/Menu.vue'
import Banner from "@/components/shared/Banner.vue"
import Map from '@/components/shared/Map.vue'
import ShowText from '@/components/shows/ShowText.vue'
import ShowHeader from '@/components/shows/ShowHeader.vue'
import AdminDetails from '@/components/shows/AdminDetails'
import Ticket from '@/components/shared/Ticket'
import Error from '@/components/shared/Error'

import getAdminDataFn from '@/helper/getAdminDataFn'
import getDataFn from '@/helper/getAdminDataFn'
import checkLoginMixin from '@/mixins/checkLoginMixin'

export default {
  mixins: [checkLoginMixin],
  components:{
    Menu,
    Banner,
    Map,
    ShowText,
    Error,
    ShowHeader,
    AdminDetails,
    Ticket
  },
  data(){
    return{
      editable: false
    }
  },
  async created () {
    await this.checkLogin()

    const showId = this.$route.params.id
    const token = this.$store.state.token
    const profileId = this.$store.state.baseUser.userData
    let response

    if (this.$route.name === 'admin-show') {
      const url = `/admin/show/${profileId}/${showId}`
      response = await getAdminDataFn(url, token)
      this.editable = true
    } else {
      const url = `show/${showId}`
      response = await getDataFn(url)
    }

    if (response.error) {
      return this.$store.commit('updateError', response)
    }

    this.$store.commit('loadShow', response)
  },
  computed:{
    show(){
      return this.$store.state.show
    }, 
  },
}
</script>

<style lang="scss" scoped>
  .show-details{

  }
</style>
