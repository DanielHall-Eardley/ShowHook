<template>
  <section class="venue-preferences" >
    <h3 class="section-heading">Hosting experience and preferences</h3>
    <select 
      name="experience" 
      v-on:change="addPreferences($event)"
      class="default-input">
      <option value="">
        Choose your level of experience
      </option>
      <option>
        I have not organized a show before
      </option>
      <option>
        I am familar with the process of organizing a show
      </option>
      <option>
        I have successfully run a show
      </option>
    </select>
    <select 
      name="frequency" 
      v-on:change="addPreferences($event)"
      class="default-input">
      <option value="">
        Choose the frequency of which you wish to host shows
      </option>
      <option>Undecided</option>
      <option>Part-time</option>
      <option>Full-time</option>
    </select>
  </section>
</template>

<script>
  export default {
    methods: {
      addPreferences(e) {
        this.$store.commit("addVenuePreferences", {
          value: e.target.value,
          name: e.target.name
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .venue-preferences {
    display: grid;
    grid-row-gap: var(--spacing);

    select{
      height: 4rem;
      font-size: 1.8rem;
      appearance: none;
    }
  }
</style>