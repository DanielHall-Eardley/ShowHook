<template>
  <div class="features-container" v-bind:style="featurePos">
    <figure v-for="feature in features">
      <img v-bind:src="feature.src" alt="icon">
      <figcaption>{{feature.feature}}</figcaption>
    </figure>
  </div>
</template>

<script>
  export default{
    props:{
      features: Array,
      featurePos: Object
    }
  }
</script>

<style lang="scss">
  .features-container{
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing);
    figure{
      height: 14vh;
      margin: 20px 0px;
      img{
        width: auto;
        height: 100%;
        object-fit: cover;
      }
      figcaption{
        text-align: center;
        margin-bottom: 2px;
      }
    }
  }
</style>
