<template lang="html">
  <div id="booking-details">
    <h1>{{getParams}}</h1>
  </div>
</template>

<script>
export default {
  computed:{
    getParams(){
      return this.$route.params.id
    }
  }
}
</script>

<style lang="scss">
</style>
