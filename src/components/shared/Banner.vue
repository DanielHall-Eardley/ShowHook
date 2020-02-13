<template>
  <div class="banner">
    <div class="choose-banner" v-if="photoArray">
      <img 
        :src="photo" 
        alt="Select Photo" 
        v-for="photo in photoArray" 
        :key="photo"
        class="select-photo"
        @click="selectBannerPhoto(photo)"
      >
    </div>
    <img 
      alt="Banner Photo"  
      :src="photoUrl"
      v-else
      class="banner-photo"
    >
    <svg 
      @click="editBannerPhoto" 
      v-if="editable" 
      class="edit-icon">
      <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
    </svg>
  </div>
</template>

<script>
  export default {
    props: ["photoUrl", "photoArray", "editable"],
    methods: {
      editBannerPhoto() {
        if (this.photoArray) {
          return
        }

        this.$emit("editBannerPhoto")
      },
      selectBannerPhoto(photoUrl) {
        this.$emit("clearPhotoArray")
        this.$store.commit("updateBannerPhoto", photoUrl)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .banner{
    width: 100%;
    height: 67vh;
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
