<template lang="html">
  <section class="act-profile">
    <Menu></Menu>
    <Error/>
    <div>
      <Banner 
        :photoUrl="actData.bannerPhoto"
        :photoArray="photoArray" 
        :editable="editable"
        v-on:editBannerPhoto="editBannerPhoto"
        v-on:clearPhotoArray="clearPhotoArray">
      </Banner>
      <Title 
        :data="actData" 
        :editable="editable"
        :userType="actData.userId.userType">
      </Title>
      <About
        v-if='actData._id'
        :text="actData.description"
        :name="actData.userId.name"
        :userId="actData.userId._id"
        :userType="actData.userId.userType"
        :joinedAt="actData.createdAt"
        :editable="editable"
        :members='actData.members'>       
      </About>
      <Shows 
        v-if='actData._id'
        :userId="actData.userId._id" 
        :profileId='actData._id'
        :linkType='actData.selfType === "venue" ? "act" : "venue"'/>
      <!-- <Video 
        :videoId="actData.youtubeLink"
        :editable="editable"
        :userType="actData.userId.userType">
      </Video>
      <BandMusic
        :trackId="actData.soundcloudLink"
        :editable="editable"
        :userType="actData.userId.userType">
      </BandMusic> -->
      <Blog 
        :editable="editable"
        :blogs="actData.blogs"
        :profileId="actData._id"
        :userType="actData.userId.userType">
      </Blog>
      <Gallery 
        :photoUrlArray="actData.photos" 
        :editable="editable">
      </Gallery>
      <!-- <Reviews :reviews="actData.reviews"></Reviews> -->
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
          id="update-act"
          class="primary-button" 
          @click="updateAct">
          Save changes
        </button>
      </div>
      <BookShow 
        :editable="editable"
        :price="actData.price"
        :shows="actData.shows"
        :profileId="actData._id">
      </BookShow>
    </div>
  </section>
</template>

<script>
import Shows from "@/components/profile/shared/Shows.vue"
import Video from "@/components/profile/shared/Video.vue"
import Blog from "@/components/profile/profile-musician/Blog.vue"
import Gallery from "@/components/profile/shared/Gallery.vue"
import BandMusic from "@/components/profile/profile-musician/BandMusic.vue"
import Title from "@/components/profile/shared/Title"
import Reviews from "@/components/profile/shared/Reviews"
import About from "@/components/profile/shared/About"
import BookShow from "@/components/profile/shared/BookShow"
import MakeBooking from "@/components/profile/shared/MakeBooking"
import Banner from "@/components/shared/Banner"
import Menu from "@/components/shared/Menu"
import Error from "@/components/shared/Error"

import getAdminDataFn from "@/helper/getAdminDataFn"
import getDataFn from "@/helper/getDataFn"

export default {
  components:{
    Shows,
    Video,
    Blog,
    Gallery,
    BandMusic,
    Menu,
    Banner,
    MakeBooking,
    BookShow,
    About,
    Reviews,
    Title,
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
    let response

    if (this.$route.name === "admin-act") {
      response = await getAdminDataFn(`/admin/act/${id}`, token)
      this.editable = true
    } else {
      response = await getDataFn(`/act/${id}`)
    }

    if (response.error) {
      return this.$store.commit('updateError', response.error) 
    }
    console.log(response)
    this.$store.commit("loadProfileData", {
      data: response.act,
      profileType: "actData"
    })
  },
  methods: {
    editBannerPhoto() {
      this.photoArray = this.actData.photos
    },
    clearPhotoArray() {
      this.photoArray = null
    },
    updateAct() {
      this.$store.dispatch("updateAct", this.$route.fullPath)
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
  computed:{
    actData(){
      return this.$store.state.actData
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper.scss";

  .video-container{
    margin: var(--spacing);
    padding: var(--spacing);
    background: var(--alt-primary)
  }
</style>
