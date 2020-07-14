<template lang="html">
  <div class="card">
    <h4>
      <span>{{data.title}}</span>
      <span>$
        {{data.price}}
        <!--<svg>
          <use></use>
        </svg>-->
      </span>
    </h4>
    <div class="img-container">
      <img 
        :src="data.bannerPhoto" 
        alt="Profile photo"
        @click="goToProfile">
    </div>
    <div class="information-container">
      <span>{{data.address.description.split(",")[2]}}</span>
      <span>{{data.selfType}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["data"],
    methods: {
      goToProfile() {
        console.log(this.data)
        this.$router.push({
          name: this.data.selfType, 
          params:{
            id: this.data._id
          },
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    font-size: 1.5rem;
    border: var(--light-border);
    border-radius: .5rem;
    padding: 0 var(--alt-spacing);
    
    h4, .information-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 18%;
    }

    .img-container {
      height: 64%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }
</style>
