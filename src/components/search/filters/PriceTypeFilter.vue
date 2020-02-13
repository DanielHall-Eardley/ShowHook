<template lang="html">
  <div class="price-type-filter">
    <h3>Price Type</h3>
    <div class="radio">
      <input 
        type="radio"
        id="split"
        value="Split"
        v-on:input='updatePriceType($event)'
        hidden
        name="price-type">
      <label for="split">Split</label>
    </div>
    <div class="radio">
      <input 
        type="radio"
        id="fixed"
        v-on:input='updatePriceType($event)'
        value="Fixed"
        hidden
        name="price-type">
      <label for="fixed">Fixed</label>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      updatePriceType(e) {
        this.$store.commit("addSingleFilter", {
          key: "priceType",
          value: e.target.value
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .price-type-filter {
    display: grid;
    align-content: start;
    grid-row-gap: var(--alt-spacing);
    h3 {
      margin-bottom: var(--spacing);
    }
  }
</style>
