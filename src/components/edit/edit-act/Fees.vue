<template>
  <section class="fee">
    <h3 class="section-heading">Fees</h3>
    <input 
      type="number" 
      class="edit-input"
      name="fee"
      placeholder="Your act's fee"
      v-on:input="addActFees($event)"
    >
    <input 
      type="number" 
      class="edit-input"
      name="travel"
      v-on:input="addActFees($event)"
      placeholder="Specify a travel allowance"
    >
    <input 
      type="number" 
      class="edit-input"
      v-on:input="addActFees($event)"
      name="accomodation"
      placeholder="Specify a accomodation allowance"
    >
  </section>
</template>

<script>
  export default {
    methods: {
      addActFees(e) {
        this.$store.commit("addActFees", {
          name: e.target.name,
          value: e.target.value
        })
      }
    }
  }
</script>

<style>
  .fee input {
    height: 4rem;
    margin-bottom: var(--spacing);
  }
</style>