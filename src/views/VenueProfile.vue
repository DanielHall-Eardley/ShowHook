<template lang="html">
  <section class="venue-container">
    <Menu></Menu>
    <div class="venue-profile" v-if="venueData">
      <Banner 
        :photoUrl="venueData.bannerPhoto"
        :photoArray="photoArray" 
        :editable="editable"
        v-on:editBannerPhoto="editBannerPhoto"
        v-on:clearPhotoArray="clearPhotoArray">
      </Banner>
      <Title 
        :data="venueData" 
        :editable="editable">
      </Title>
      <FeatureIcons 
        :feature="venueData.venueDetails"
        :editable="editable">
      </FeatureIcons>
      <About
        :text="venueData.description"
        :name="venueData.userId.name"
        :userId="venueData.userId._id"
        :userType="venueData.userId.userType"
        :joinedAt="venueData.createdAt"
        :editable="editable">       
      </About>
      <Shows></Shows>
      <VenueDetails 
        :amenitiesArray="venueData.amenities"
        :rulesArray="venueData.rules"
        :pricingObject="venueData.pricing"
        :editable="editable"
        :suitableArray="venueData.suitableActTypes">
      </VenueDetails>
      <Gallery 
        :pictures="venueData.photos"
        :editable="editable">
      </Gallery>
      <Reviews :reviews="venueData.reviews"></Reviews>
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
        :price="venueData.pricing.base"
        :shows="venueData.shows"
        :profileId="venueData._id">
      </BookShow>
    </div>
    <p class="venue-loading-error" v-else>
      {{error ? error : "Loading"}}
    </p>
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
    Gallery
  },
  data() {
    return {
      editable: false,
      photoArray: null,
      error: null
    }
  },
  async created() {
    await this.$store.dispatch("autoLogin", this.$route.fullPath)
    const id = this.$route.params.id

    if (this.$route.query.searchType === "userId") {
      const token = this.$store.state.userConfig.token
      const responseData = await getAdminDataFn("admin/venue/" + id, token)
      this.editable = true
      if (responseData.messages) {
        return this.error = responseData.messages
      }
      
      return this.$store.commit("loadProfileData", {
        data: responseData.venue,
        profileType: "venueData"
      })
    }

    const responseData = await getDataFn("venue/" + id)
    if (responseData.messages) {
      return this.error = responseData.messages
    }

    this.$store.commit("loadProfileData", {
      data: responseData.data.venue,
      profileType: "venueData"
    })
  },
  methods: {
    editBannerPhoto() {
      this.photoArray = this.venueData.photos
    },
    clearPhotoArray() {
      this.photoArray = null
    },
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
      return this.$store.state.userConfig.venueData
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
