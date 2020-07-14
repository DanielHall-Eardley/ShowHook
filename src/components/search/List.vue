<template>
  <div class="list">
    <app-card  
      v-for="result in array"
      :key="result._id"
      :data="result">
    </app-card>
  </div>
</template>

<script>
  import Card from "@/components/search/Card"

  export default {
    props: ["array"],
    components: {
      appCard: Card
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    height: 70vh;
    overflow-y: auto;
    display: grid;
    grid-auto-rows: 22rem;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    padding: var(--alt-spacing) var(--spacing);
    grid-gap: var(--alt-spacing);
  }
</style>