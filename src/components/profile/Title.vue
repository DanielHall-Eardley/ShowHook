<template>
  <div id="title-container">
    <h1>{{info.name.content}}</h1>
    <span>{{info.location.content}}</span>
    <span>{{showGenres}}</span>
    <span>{{countReviews}}</span>
    <router-link class='booking-link' :to="{ name: '', params: {} }"></router-link>
  </div>
</template>

<script>
  export default{
    props:{
      info: Object,
    },
    computed:{
      countReviews(){
        let count = this.info.reviews.length
        if (count === 0){
          return "No reviews yet"
        }else{
          return count + " Reviews"
        }
      },
      showGenres(){
        let genres = ""
        for(let i in this.info.genres){
          genres +=  i + " "
        }
        return genres
      }
    }
  }
</script>

<style lang="scss">
  #title-container{
    h2{
      font-family: var(--heading-font);
    }
    span{
      display: inline-block;
      font-size: var(--subheading-size);
      margin-right: var(--spacing);
    }
  }
</style>
