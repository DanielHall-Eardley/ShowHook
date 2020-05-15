<template>
  <div class="error" v-if="getError && getError.length > 0">
    <p v-for="error in getError" :key="error.param">
      {{error.msg || error}}
    </p>
  </div>
</template>

<script>
  export default {
    props: ["errorType"],
    computed: {
      getError () {
        return this.$store.state.error
      }
    }
  }
</script>

<style lang="scss">
  @import "@/globalStyles/helper";
</style>