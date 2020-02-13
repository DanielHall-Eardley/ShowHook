<template>
  <section class="pricing">
    <h3 v-if="!editable" class="section-heading">Pricing</h3>
    <select class="edit-input">
      <option selected disabled>Select Price Type</option>
      <option>Open</option>
      <option>Split</option>
      <option>Fixed</option>
    </select>
    <input 
      type="number" 
      class="edit-input"
      v-model="price"
      placeholder="Base price - per show"
    >
  </section>
</template>

<script>
  export default {
    props: ["editable"],
    data() {
      return {
        priceType: "Open",
        price: null,
      }
    },
    updated() {
      const pricingData = {
        type: this.priceType,
        price: this.price,
      }

      this.$store.commit("addVenuePricing", pricingData)
    }
  }
</script>

<style lang="scss" scoped>
  .pricing {
    display: grid;
    grid-row-gap: var(--spacing); 

    &-type {
 
    }
  }
</style>