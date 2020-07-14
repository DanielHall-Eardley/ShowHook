<template lang="html">
  <section 
    class="pictures" 
    v-if='checkIfGalleryShown(photoUrlArray ? photoUrlArray.length : null)'>
    <div class="title-edit-container">
      <h3 class="paragraph-heading">Pictures</h3>
      <svg 
        @click="showEdit = !showEdit"
        v-if="editable">
        <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
      </svg>
    </div>
    <div class="gallery">
      <img 
        v-for="url in photoUrlArray"
        :src="url"
        alt="Gallery picture">
    </div>
    <Photos v-if="showEdit" :editable="editable" :existingPhotos='photoUrlArray'/>
  </section>
</template>

<script>
  import Photos from "@/components/edit/shared/Photos"
  
  export default {
    data() {
      return {
        showEdit: false
      }
    },
    props: ["photoUrlArray", "editable"],
    components: {
      Photos
    },
    methods: {
      checkIfGalleryShown(photoCount) {
        const routeType = this.$route.name.split("-")[0]
        if (routeType === 'admin' || photoCount > 0) {
          return true
        }
        return false
      },
    }
  }
</script>

<style scoped>
  .pictures{
    padding: var(--spacing);
    border-bottom: var(--light-border);
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-auto-rows: 20rem;
    gap: var(--alt-spacing);
    margin-bottom: var(--spacing);
  }

  .gallery img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
