<template>
  <div class="error" v-if='errorArray.length > 0'>
    <p v-for="errorMessage in errorArray" :key="errorMessage">
      {{errorMessage}}
    </p>
  </div>
</template>

<script>
  export default {
    computed: {
      errorArray () {
        const error = this.$store.state.error
      
        if (!error) {
          return []
        }

        if (!Array.isArray(error)) {
          return [error]
        }
        return error
      }
    }
  }
</script>

<style lang="scss">
  @import "@/globalStyles/helper";
</style>