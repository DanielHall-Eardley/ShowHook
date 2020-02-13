<template>
  <button 
    class="select-day-btn"
    :disabled="disable"
    :class="{highlight: disable}"
    @click="selectDay(day)">
    {{day}}
  </button>
</template>

<script>
  export default {
    props: ["disable", "day"],
    methods: {
      selectDay(number) {
        this.$emit("selectDay", number)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .select-day-btn {
    padding: .5rem 0;
    border: none;
  }

  .highlight {
    background-color: var(--primary);
  }
</style>