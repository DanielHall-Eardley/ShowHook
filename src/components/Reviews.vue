<template>
  <div id="reviews" v-bind:style="reviewPos">
    <h2>Reviews</h2>
    <ReviewBreakdown v-bind:ratings="averageRatings"></ReviewBreakdown>
    <div v-for="review in reviews">
      <img  alt="Profile picture" v-bind:src="review.profilePic">
      <p>{{review.comment}}<br>-{{review.name}} from {{review.location}}</p>
    </div>
  </div>
</template>

<script>
import ReviewBreakdown from '@/components/ReviewBreakdown.vue'

export default {
  props:{
    reviews: Array,
    reviewPos: Object,
    averageRatings: Array
  },
  components:{
    ReviewBreakdown,
  },
};
</script>

<style lang="scss">
  #reviews{
    margin: var(--spacing);
    padding: var(--spacing);
    background: var(--primary);
    div{
      display: flex;
      height: 10vh;
      margin-top: var(--spacing);
    }
    h2{
      margin: 5px;
    }
    img{
      height: 100%;
      object-fit: contain;
      margin-right: var(--spacing);
    }
  }
</style>
