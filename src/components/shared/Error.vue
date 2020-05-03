<template>
  <div class="error" v-if="getError.length > 0">
    <p v-for="error in getError" :key="error.param">
      {{error.msg}}
    </p>
  </div>
</template>

<script>
  export default {
    props: ["errorType"],
    computed: {
      getError () {
        return this.$store.state.userConfig.error
      }
    }
  }
</script>

<style lang="scss">
  @import "@/globalStyles/helper";
</style>