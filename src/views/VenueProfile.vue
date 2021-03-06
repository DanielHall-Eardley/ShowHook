<template lang="html">
  <section class="venue-container">
    <Menu></Menu>
    <Error></Error>
    <div class="venue-profile" v-if="venueData">
      <Banner 
        :photoUrl="venueData.bannerPhoto"
        :photoArray="photoArray" 
        :editable="editable">
      </Banner>
      <Title 
        :data="venueData" 
        :editable="editable">
      </Title>
      <!-- <FeatureIcons 
        :feature="venueData"
        :editable="editable">
      </FeatureIcons> -->
      <About
        :text="venueData.description"
        :name="venueData.userId.name"
        :userId="venueData.userId._id"
        :userType="venueData.userId.userType"
        :joinedAt="venueData.createdAt"
        :editable="editable">       
      </About>
      <Shows 
        :userId="venueData.userId._id" 
        :profileId='venueData._id'
        :linkType='venueData.selfType === "venue" ? "act" : "venue"'/>
      <VenueDetails 
        :amenitiesArray="venueData.amenities"
        :rulesArray="venueData.rules"
        :editable="editable"
        :suitableArray="venueData.suitableActTypes">
      </VenueDetails>
      <Gallery 
        :photoUrlArray="venueData.photoUrlArray"
        :editable="editable">
      </Gallery>
      <!-- <Reviews :reviews="venueData.reviews"></Reviews> -->
      <Map 
        :address="venueData.address"
        :name="venueData.title"
        :photo="venueData.bannerPhoto">
      </Map>
      <div class="save-changes-container" v-if="editable">
        <button 
          class="alt-button" 
          @click="deleteProfile('full')">
          Delete full profile
        </button>
        <button 
          class="alt-button" 
          @click="deleteProfile('partial')">
          Delete listing
        </button>
        <button 
          class="primary-button" 
          @click="updateVenue">
          Save changes
        </button>
      </div>
      <BookShow
        :editable="editable"
        :price="venueData.price"
        :shows="venueData.shows"
        :profileId="venueData._id">
      </BookShow>
    </div>
  </section>
</template>

<script>
import Title from "@/components/profile/shared/Title"
import About from "@/components/profile/shared/About.vue"
import Reviews from "@/components/profile/shared/Reviews.vue"
import Banner from "@/components/shared/Banner.vue"
import Menu from "@/components/shared/Menu"
import FeatureIcons from "@/components/profile/profile-venue/FeatureIcons"
import VenueDetails from "@/components/profile/profile-venue/VenueDetails"
import Map from "@/components/shared/Map"
import BookShow from "@/components/profile/shared/BookShow"
import Shows from "@/components/profile/shared/Shows.vue"
import Gallery from "@/components/profile/shared/Gallery.vue"
import Error from "@/components/shared/Error.vue"

import getAdminDataFn from "@/helper/getAdminDataFn"
import getDataFn from "@/helper/getDataFn"

export default {
  components:{
    VenueDetails,
    Title,
    Banner,
    About,
    FeatureIcons,
    VenueDetails,
    Reviews,
    Map,
    BookShow,
    Menu,
    Shows,
    Gallery,
    Error
  },
  data() {
    return {
      editable: false,
      photoArray: null,
    }
  },
  async created() {
    this.$store.commit('clearError')
    const loggedIn = await this.$store.dispatch('checkLogin')
    if (!loggedIn) {
      this.$router.push({
        name: 'admin',
        query: {
          type: 'login',
          redirect: this.$route.fullPath
        }
      })
    }

    const id = this.$route.params.id
    const token = this.$store.state.token

    if (this.$route.name === "admin-venue") {
      const response = await getAdminDataFn(`/admin/venue/${id}`, token)
      this.editable = true
      if (response.error) {
        return this.$store.commit('updateError', response.error)
      }
      
      return this.$store.commit("loadProfileData", {
        data: response.venue,
        profileType: "venueData"
      })
    }

    const response = await getDataFn("/venue/" + id)
    if (response.error) {
      return this.$store.commit('updateError', response.error)
    }

    this.$store.commit("loadProfileData", {
      data: response.venue,
      profileType: "venueData"
    })
  },
  methods: {
    updateVenue() {
      this.$store.dispatch("updateVenue", this.$route.fullPath)
    },
    deleteProfile(deleteType) {
      if (deleteType === "full") {
        alert("Are you sure? Your listing and base profile will be deleted")
      }

      this.$store.dispatch("deleteProfile", {
        id: this.$route.params.id,
        fullPath: this.$route.fullPath,
        deleteType
      })
    }
  },
  computed: {
    venueData() {
      return this.$store.state.venueData
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper.scss";

  .venue-loading-error {
    font-size: 3rem;
    text-align: center;
    padding: var(--spacing); 
  }
</style>
