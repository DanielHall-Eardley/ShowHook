<template>
  <div class="error" v-if="errors && errors.length > 0">
    <p v-for="error in errors" :key="error">
      {{error}}
    </p>
  </div>
</template>

<script>
  export default {
    computed: {
      errors () {
        const error = this.$store.state.error
        if (!Array.isArray(error) && error) {
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