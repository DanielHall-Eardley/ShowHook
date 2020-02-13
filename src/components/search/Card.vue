<template lang="html">
  <div class="card">
    <h4>
      <span>{{data.title}}</span>
      <span>{{data.price}}</span>
    </h4>
    <img :src="data.bannerPhoto" alt="Banner Photo">
    <div>
      <span>{{data.address.description}}</span>
      <router-link :to="{}">View Profile</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["data"],
  }
</script>

<style lang="scss" scoped>
  .card-container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-rows: 30%;
    grid-row-gap: var(--spacing);
    grid-column-gap: var(--spacing);
    position: relative;
    overflow-y: scroll;
    span{
      margin-left: 5px;
    }
  }

  .mapActive{
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-right: var(--alt-spacing);
    flex: 1
  }

  #sub-img, .img-container{
    height: 100%;
  }

  .img-container{
    display: flex;
    align-items: center;
  }

  .card{
    display: flex;
    flex-direction: column;

  }
  #main-img{
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    border: solid 0.2px var(--alt-primary);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .main-img-container{
    height: 70%;
  }
  .sub-img-container{
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: solid 0.5px var(--alt-primary);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 5px;
    box-sizing: border-box;
  }

  .scroll-down{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
