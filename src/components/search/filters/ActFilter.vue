<template>
  <div class="act-filters checked-filters">      
    <h3>Act Types</h3>
    <div class="checkbox">
      <input 
        type="checkbox"
        id="solo"
        v-on:input='updateCheckedInput($event)'
        hidden
        value="Solo">
      <label for="solo"> 
        Solo 
        <svg v-show="solo">
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </label>
    </div>
    <div class="checkbox">
      <input 
        type="checkbox"
        id="duo"
        v-on:input='updateCheckedInput($event)'
        hidden
        value="Duo">
      <label for="duo">
        Duo
        <svg v-show="duo">
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </label>
    </div>
    <div class="checkbox">
      <input 
        type="checkbox"
        id="band"
        v-on:input='updateCheckedInput($event)'
        hidden
        value="Band">
      <label for="band">
        Band
        <svg v-show="band">
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </label>
    </div>
    <div class="checkbox">
      <input 
        type="checkbox"
        id="dj"
        v-on:input='updateCheckedInput($event)'
        hidden
        value="DJ">
      <label for="dj">
        DJ
        <svg v-show="dj">
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
    data() {
      return {
        arrayType: "actFilters",
        solo: false,
        duo: false,
        band: false,
        dj: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .act-filters {

    h3 {
      margin-bottom: var(--alt-spacing);
    }
  }
</style>