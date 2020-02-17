<template>
  <section class="pricing">
    <h3 v-if="!editable" class="section-heading">Pricing</h3>
    <select 
      class="edit-input" 
      v-model="priceType"
      v-on:change="updatePricing($event)"
      name="priceType">
      <option disabled>Select Price Type</option>
      <option>Open</option>
      <option>Split</option>
      <option>Fixed</option>
    </select>
    <input 
      type="number" 
      class="edit-input"
      v-model="price"
      placeholder="Set your base price"
      v-on:change="updatePricing($event)"
      name="price"
    >
  </section>
</template>

<script>
  export default {
    props: ["editable"],
    data() {
      return {
        priceType: "Select Price Type",
        price: 0,
      }
    },
    methods: {
      updatePricing(e) {
        const key = e.target.name

        this.$store.commit("addPricing", {
          key,
          value: this[key]
        })
      }
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