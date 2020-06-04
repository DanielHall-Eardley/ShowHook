<template>
  <div class="banner">
    <div class="choose-banner" v-if="showPhotoArray">
      <p v-if='photoArray.length < 1'>Add More Photos</p>
      <img 
        v-else
        :src="photo" 
        alt="Select Photo" 
        v-for="photo in photoArray" 
        :key="photo"
        class="select-photo"
        @click="selectBannerPhoto(photo)">
    </div>
    <img 
      alt="Banner Photo"  
      :src="bannerPhoto"
      v-else
      class="banner-photo">
    <svg 
      @click="showPhotoArray = !showPhotoArray" 
      v-if="editable" 
      class="edit-icon">
      <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
    </svg>
  </div>
</template>

<script>
  export default {
    props: ["photoUrl", "photoArray", "editable"],
    data(){
      return {
        showPhotoArray: false
      }
    },
    computed: {
      bannerPhoto() {
        if (!this.photoUrl) {
          return 'https://via.placeholder.com/1000'
        }

        return this.photoUrl
      }
    },
    methods: {
      selectBannerPhoto(photoUrl) {
        this.$store.commit("updateBannerPhoto", photoUrl)
        //dispatch action to store photos somewhere
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .banner{
    width: 100%;
    height: 50vh;
    box-sizing: border-box;
    background-size: cover;
    background-position: center;
    position: relative;
    border-bottom: var(--light-border);

    .banner-photo, .select-photo{
      height: 100%;
      width: 100%;
      object-fit: cover;
      display: block;
    }

    .choose-banner {
      height: 100%;
      display: grid;
      grid-auto-rows: 50%;
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr))
    }

    svg {
      right: var(--spacing);
      bottom: var(--spacing);
    }
  }
</style>
