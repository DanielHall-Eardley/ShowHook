<template>
  <div class="error" v-if="checkError">
    <p v-for="error in checkError" :key="error">
      {{error}}
    </p>
  </div>
</template>

<script>
  export default {
    props: ["errorType"],
    computed: {
      checkError () {
        const errorType = this.errorType || "error"
        return this.$store.state.userConfig[errorType]
      }
    }
  }
</script>

<style lang="scss">
  @import "@/globalStyles/helper";
</style>