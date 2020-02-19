<template>
  <div class="offer-summary-item">
    <h3 class="title">
      {{
        type === "offeror" ? 
        "You have received an offer from" : 
        "You have offered"
      }}
      <span>{{summary[type + "Name"]}}</span>
      of
      <span>{{summary[type + "Title"]}}</span>
      for date of
      <span>{{summary.bookingDate}}</span>
    </h3>
    <div class="info">
      <span>Offer: {{summary.price}}</span>
      <span>Status: {{summary.status}}</span>
      <ReviewStars :rating="summary[type + 'Rating']"></ReviewStars>
      <router-link :to="{name: 'offer', params: {id: summary._id}}">
        View {{summary[type + "Title"]}}'s profile
      </router-link>
    </div>
    <p class="recent-message">{{summary.mostRecentMessage}}</p>
    <span>{{summary.updatedAt}}</span>
  </div>
</template>

<script>
  import ReviewStars from "@/components/profile/shared/ReviewStars"

  export default {
    props: ["summary", "type"],
    components: {
      ReviewStars,
    }
  }
</script>

<style>

</style>