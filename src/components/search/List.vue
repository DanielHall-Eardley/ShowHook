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

<style>

</style>