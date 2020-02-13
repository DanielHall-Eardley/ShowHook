<template lang="html">
  <div class="genre-container">
    <h3 class="section-heading">Select Genres</h3>
    <div class="button-container">
      <genre-button 
        v-for="genre in genreArray"
        :genre="genre">
      </genre-button>
    </div>
  </div>
</template>

<script>
import GenreButton from "../shared/GenreButton"

export default {
  data(){
    return {
      genreArray: this.$store.state.appConfig.musicGenres
    }
  },
  components: {
    GenreButton
  }
}
</script>

<style lang="scss" scoped>
  @import '@/globalStyles/mixins.scss';

  .genre-container {
    .button-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      grid-gap: var(--alt-spacing);
    }
  }
</style>
