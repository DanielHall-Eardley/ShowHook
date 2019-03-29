<template>
  <img id="banner" v-bind:src="banner">
</template>

<script>
export default {
   props: {
    banner: String
  }
};
</script>

<style lang="scss">
  #banner{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
