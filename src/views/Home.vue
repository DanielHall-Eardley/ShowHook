<template>
  <div id="home">
    <p>{{getParams}}</p>
  </div>
</template>

<script>

export default {
  computed:{
    getParams(){
      return this.$route.params.search
    }
  }
}
</script>

<style lang="scss">

</style>
