<template lang="html">
  <div class="venue-profile">
    <ProfileTemplate v-bind:getDetails="getDetails">
      <VenueDetails
        slot="slot-one"
        v-bind:venueDetails="getDetails.venueDetails">
      </VenueDetails>
    </ProfileTemplate>
  </div>
</template>

<script>
import ProfileTemplate from "@/components/ProfileTemplate.vue"
import VenueDetails from "@/components/VenueDetails.vue"

export default {
  components:{
    ProfileTemplate,
    VenueDetails,
  },
  computed:{
    getDetails(){
      return this.$store.state.userConfig.user
    }
  }
}
</script>

<style lang="scss">
</style>
