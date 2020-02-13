<template lang="html">
  <div class="price-range">
    <h3>Price Range</h3>
    <input 
      type="number" 
      class="edit-input"
      v-on:change="updatePriceRange($event)"
      placeholder="Min"
      name="min"
      v-model="min"
    >      
    <input 
      type="number" 
      class="edit-input"
      v-on:change="updatePriceRange($event)"
      placeholder="Max"
      name="max"
      v-model="max"
    >           
  </div>
</template>

<script>
export default {
  data() {
    return {
      min: null,
      max: null
    }
  },
  methods:{
    updatePriceRange(e){
      const key = e.target.name
      const value = e.target.value
      let resetRangedFilter = false

      if (parseInt(this.min) > parseInt(this.max) && parseInt(this.max)) {
        alert("Maximum price must be higher than the minimum price") 
        this.min = null
        this.max = null
        resetRangedFilter = true
      }

      this.$store.commit('addRangedFilter', {
        key,
        value,
        resetRangedFilter,
        type: "priceRange"
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .price-range{
    display: grid;
    grid-row-gap: var(--spacing);
    grid-auto-rows: min-content;

    h3 {
      margin-bottom: var(--alt-spacing);
    }

    input {
      width: 10rem;
    }
  }
</style>
