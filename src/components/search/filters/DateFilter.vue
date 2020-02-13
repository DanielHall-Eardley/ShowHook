<template>
  <div class="date-range">
    <h3>Filter by Date</h3>      
    <input 
      type="date" 
      v-model="start" 
      name="start" 
      v-on:change="updateDateRange($event)"
      class="edit-input">
    <input 
      type="date" 
      v-model="end" 
      class="edit-input"
      name="end" 
      v-on:change="updateDateRange($event)">
  </div>
</template>

<script>
  export default {
  data() {
    return {
      start: null,
      end: null
    }
  },
  methods:{
    updateDateRange(e){
      const key = e.target.name
      const value = e.target.value
      let resetRangedFilter = false

      if (new Date(this.start).getTime() > new Date(this.end).getTime() && this.end) {
        alert("The start date must be before the end date") 
        this.start = null
        this.end = null
        resetRangedFilter = true
      }

      this.$store.commit('addRangedFilter', {
        key,
        value,
        resetRangedFilter,
        type: "dateRange"
      })
    },
  }
  }
</script>

<style lang="scss" scoped>
  .date-range{
    display: grid;
    grid-row-gap: var(--alt-spacing);
    grid-auto-rows: min-content;

    h3 {
      margin-bottom: var(--alt-spacing);
    }
  }
</style>