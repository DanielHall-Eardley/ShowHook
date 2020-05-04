<template>
  <div class="act-type">
    <h3 class="section-heading">Type of Act</h3>
    <select 
      class="default-input select" 
      v-model="actType" 
      v-on:change="updateActType">
      <option disabled>Select Act Type</option>
      <option value="Band">Band</option>
      <option value="DJ">DJ</option>
      <option value="Solo Artist">Solo Artist</option>
      <option value="Duo">Duo</option>
    </select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        actType: "Select Act Type"
      }
    },
    methods: {
      updateActType() {
        this.$store.commit("addActType", this.actType)
      }
    }
  }
</script>

<style>

</style>