<template>
  <div class="genre-filters">
    <h3>Filter by Genre</h3>
    <input 
      type="text"
      placeholder="Enter a genre"
      v-model="genreFilter"
      v-on:keyup.enter="addGenreFilter"
      class="default-input">
      <div class="genre-filters-container">
        <button 
          class="primary-button"
          v-for="genre in genreFilters" 
          :key="genre"
          @click.capture="removeGenreFilter($event)">
          {{genre}}
        </button>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        genreFilter: ""
      }
    },
    methods: {
      addGenreFilter() {
        this.$store.commit('addGenreFilter', this.genreFilter)
        this.genreFilter = ""
      },
      removeGenreFilter(e) {
        this.$store.commit('removeGenreFilter', e.target.innerText)
      },
    },
    computed: {
      genreFilters() {
        return this.$store.state.appConfig.searchQuery.genreFilters
      }
    }
  }
</script>

<style lang="scss" scoped>
  .genre-filters {
    h3 {
      margin-bottom: var(--spacing);
    }

    input {
      margin-bottom: var(--alt-spacing);
    }

    .genre-filters-container {
      display: grid;
      grid-template-columns: repeat(3, min-content);
      grid-gap: var(--alt-spacing);
    }
  }
</style>