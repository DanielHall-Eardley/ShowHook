<template lang="html">
  <div class="venue-filters checked-filters">
    <h3>Filter by Venue Type</h3>
     <div class="checkbox">
      <input 
        type="checkbox"
        id="bar"
        v-on:input='updateCheckedInput($event)'
        hidden
        value="Bar">
      <label for="bar"> 
        Bar 
        <svg v-show="bar">
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </label>
    </div>
    <div class="checkbox">
      <input 
        type="checkbox"
        id="sharedSpace"
        v-on:input='updateCheckedInput($event)'
        hidden
        value="Shared Space">
      <label for="sharedSpace">
        Shared Space
        <svg v-show="sharedSpace">
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </label>
    </div>
    <div class="checkbox">
      <input 
        type="checkbox"
        id="privateSpace"
        v-on:input='updateCheckedInput($event)'
        hidden
        value="Private Space">
      <label for="privateSpace">
        Private Space
        <svg v-show="privateSpace">
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </label>
    </div>
  </div>
</template>

<script>
  import filterMixin from "@/mixins/filterMixin"

  export default {
    mixins: [filterMixin],
    data(){
      return{
        arrayType: "venueFilters",
        bar: false,
        sharedSpace: false,
        privateSpace: false,
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/globalStyles/helper.scss';

  .venue-filters{
    
    h3 {
      margin-bottom: var(--spacing);
    }
  }
</style>
