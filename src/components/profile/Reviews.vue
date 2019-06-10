<template>
  <div id="reviews" v-bind:style="reviewPos">
    <h3>Reviews</h3>
    <ReviewBreakdown
      v-bind:ratings="averageRatings">
    </ReviewBreakdown>
    <div v-for="review in reviews">
      <img  alt="Profile picture" v-bind:src="review.profilePic">
      <p>{{review.comment}}<br>-{{review.name}} from {{review.location}}</p>
    </div>
  </div>
</template>

<script>
import ReviewBreakdown from './ReviewBreakdown.vue'

export default {
  props:{
    reviews: Array,
    reviewPos: Object,
    averageRatings: Array,
  },
  components:{
    ReviewBreakdown,
  },
};
</script>

<style lang="scss">
  #reviews{
    margin: var(--spacing);
    border-bottom: solid 0.5px var(--primary);
  div{
      display: flex;
      height: 10vh;
      margin-bottom: var(--spacing);
    }
    img{
      height: 100%;
      object-fit: contain;
      margin-right: var(--spacing);
    }
  }
</style>
