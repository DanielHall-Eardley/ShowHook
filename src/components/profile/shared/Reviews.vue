<template>
  <div class="reviews">
    <h3 class="paragraph-heading">Reviews</h3>
    <div 
      v-for="review in reviews" 
      :key="review.userId"
      class="review-container">
      <img 
        alt="Profile picture" 
        v-bind:src="review.profilePic"
        @click="goToProfile(userId)"
      >
      <div class="review-info">
        <span>{{review.name}}</span>
        <span>Joined: {{review.createdAt}}</span>
        <ReviewStars :rating="review.rating"></ReviewStars>
        <p>{{review.comment}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import ReviewStars from "@/components/profile/shared/ReviewStars"

  export default {
    props:{
      reviews: Array,
    },
    components: {
      ReviewStars
    },
    methods: {
      goToProfile(userId) {
        this.$router.push({
          name: "profile",
          params: {
            id: userId
          }
        })
      }
    }    
  };
</script>

<style lang="scss">
  .reviews{
    padding: var(--spacing);
    border-bottom: var(--light-border);

    .review-container {
      display: flex;

      &:not(:last-child) {
        margin-bottom: var(--alt-spacing);
      }
    }

    img{
      height: 6rem;
      object-fit: contain;
      border-radius: 50%;
      margin-right: var(--spacing);
    }

    .review-info {
      font-size: 1.6rem;

      span {
        margin-right: var(--spacing);
      }

      p {
        margin-top: var(--alt-spacing);
      }
    }
  }
</style>
