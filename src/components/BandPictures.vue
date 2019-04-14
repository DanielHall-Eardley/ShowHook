<template lang="html">
  <div class="pictures">
    <img v-for="pic in pictures"
    v-bind:src="pic" alt="Gallery picture">
  </div>
</template>

<script>
export default {
  props:{
    pictures: Array
  }
}
</script>

<style lang="scss" scoped>
  .pictures{
    margin: var(--spacing);
    padding: var(--spacing);
    background: var(--alt-primary);
    border-radius: var(--border-radius);
    img{
      height: 30vh;
      display: inline-block;
      width: calc(98.5% / 4);
      margin-right: 0.5%;
    }
    img:nth-child(4), img:nth-child(8){
      margin-right: 0px;
    }
  }
</style>
