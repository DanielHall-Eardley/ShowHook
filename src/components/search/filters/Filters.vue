<template lang="html">
  <div class="search-filter-container">
    <div class="search-input">
      <input 
        type="text" 
        class="default-input"
        placeholder="Enter a search keyword"
        v-model="keyword"
        name="keyword"
        v-on:change="updateSingleFilter($event)">
      <input 
        type="text" 
        class="default-input"
        placeholder="Enter a city"
        v-model="location"
        name="location"
        v-on:change="updateSingleFilter($event)">
      <button 
        class="primary-button search-button" 
        @click="search">
        Search
      </button>
      <button 
        v-if="userType" 
        class="primary-button filter-button" 
        @click="showFilters = !showFilters">
        Filters
      </button>
    </div>
    <div class="filters" v-if="showFilters">
      <div class="showgoer-filters-container" v-if="userType === 'Showgoer'">
        <ActFilter></ActFilter>
        <DateFilter></DateFilter>
        <GenreFilter></GenreFilter>
      </div>
      <div class="venue-filters-container" v-if="userType === 'Venue'">
        <PriceRangeFilter></PriceRangeFilter>
        <PriceTypeFilter></PriceTypeFilter>
        <ActFilter></ActFilter>
        <GenreFilter></GenreFilter>
      </div>
      <div class="act-filters-container" v-if="userType === 'Act'">
        <VenueFilter></VenueFilter>
        <PriceTypeFilter></PriceTypeFilter>
        <PriceRangeFilter></PriceRangeFilter>
        <GenreFilter></GenreFilter>
      </div>
      <div class='button-container'>
        <button v-on:click='cancelSelection' class="alt-button">
          Cancel
        </button>
        <button v-on:click='refinedSearch' class="primary-button">
          Refine Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import PriceTypeFilter from '@/components/search/filters/PriceTypeFilter.vue'
  import PriceRangeFilter from '@/components/search/filters/PriceRangeFilter.vue'
  import VenueFilter from '@/components/search/filters/VenueFilter.vue'
  import ActFilter from '@/components/search/filters/ActFilter.vue'
  import DateFilter from '@/components/search/filters/DateFilter.vue'
  import GenreFilter from '@/components/search/filters/GenreFilter.vue'

  import filterMixin from "@/mixins/filterMixin"

  export default {
    props: ["userType", "page"],
    mixins: [filterMixin],
    components:{
      PriceTypeFilter,
      PriceRangeFilter,
      VenueFilter,
      ActFilter,
      GenreFilter,
      DateFilter
    },
    data(){
      return{
        showFilters: false,
        location: "",
        keyword: ""
      }
    },
    mounted() {
      this.search()
    },
    methods:{
      search() {
        if (!this.userType) {
          return this.basicSearch()
        }

        this.refinedSearch()
      },
      basicSearch() {
        this.$store.dispatch("searchResults", {
          page: this.page.toString()
        })
      },
      refinedSearch() {
        this.$store.dispatch("refinedSearchResults", this.page)
        this.showFilters = false
      },
      cancelSelection() {
        this.$store.commit("resetSearchQuery")
        this.showFilters = false
      }
    },
  }
</script>

<style lang="scss" scoped>
  .search-filter-container{
    padding: 1.6rem var(--spacing);
    font-size: 1.6rem;
    border-bottom: var(--light-border);
    min-height: 10vh;
  }

  .search-input {
    display: flex;
    width: 100%;

    input {
      margin-right: var(--spacing);
      width: 30rem;
    }

    .filter-button {
      margin-left: var(--spacing);
    }

    .search-button {
      margin-left: auto;
    }
  }

  .filters {
    margin-top: var(--spacing);

    .act-filters-container, 
    .venue-filters-container,  
    .showgoer-filters-container {
      display: grid;
      grid-auto-flow: column;
      grid-column-gap: var(--spacing);
      grid-auto-columns: max-content;
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--spacing);

      button:last-child {
        margin-left: var(--spacing)
      }
    }
  }

  .highlight{
    border-bottom: solid 2px var(--primary);
  }
</style>
