<template>
  <div id="intial-search">
      <input placeholder="Find Spaces Near..." v-model="searchQuery">
      <router-link v-bind:to="'/home/:'+ searchQuery">Search</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ""
    };
  }
};
</script>

<style lang="scss">
  #intial-search{
      flex: 1;
      display: flex;
      position: relative;
      width: 250%;
      right: 150%;
      input{
        height: 100%;
        width: 60%;
        box-sizing:border-box;
        font-size: 1.5rem;
      }
      a{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        background: linear-gradient(to right, var(--gradient-one));
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
      }
    }
</style>

