<template lang="html">
  <div id="review-breakdown">
    <div v-for="rating in ratings">
      <span>{{rating.title}}</span>
      <img v-for="i in 5" v-bind:src="getImage(i, rating.rating)" alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    ratings: Array,
  },
  methods:{
    getImage(i, rating){
      if(i > rating){
        return "https://via.placeholder.com/50/"
      }else{
        return "https://via.placeholder.com/40/FF0000"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #review-breakdown{
    width: 90%;
    display: flex;
    flex-flow: column wrap;
    margin: 0px;
    div{
      height: 20%;
      span{
        display: inline-block;
        width: 40%;
      }
    }
  }
</style>
