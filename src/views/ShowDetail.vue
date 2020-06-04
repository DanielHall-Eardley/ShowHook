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
import Error from '@/components/shared/Error'

import getAdminDataFn from '@/helper/getAdminDataFn'

export default {
  components:{
    Menu,
    Banner,
    Map,
    ShowText,
    Error,
    ShowHeader,
    AdminDetails
  },
  data(){
    return{
      editable: false
    }
  },
  async beforeCreate () {
    this.$store.commit('clearError')

    if (this.$route.name === 'admin-show') {
      await this.$store.dispatch('autoLogin', this.$route.fullPath)
      const showId = this.$route.params.showId
      const token = this.$store.state.token
      const profileId = this.$store.state.baseUser.userData
      const url = `admin/show/${profileId}/${showId}?idType=${this.$route.query.idType}`
      const responseData = await getAdminDataFn(url, token)

      if (responseData.messages) {
        return this.$store.dispatch('updateError', responseData)
      }

      this.editable = true
      return this.$store.commit('loadShow', responseData)
    }

    const showId = this.$route.params.id
    const url = `/show/${showId}`
    const responseData = await getDataFn(url)

    if (responseData.messages) {
      return this.$store.dispatch('updateError', responseData)
    }

    this.$store.commit('loadShow', responseData)
  },
  computed:{
    show(){
      console.log(this.$store.state.show)
      return this.$store.state.show
    }, 
  },
}
</script>

<style lang="scss" scoped>
  .show-details{

  }
</style>
