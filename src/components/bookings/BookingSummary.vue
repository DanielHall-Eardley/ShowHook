<template>
  <div class="booking-summary-item">
    <h3 class="title">
      {{
        type === "offeror" ? 
        "You have received an offer from" : 
        "You have offered"
      }}
      <span>{{summary[type + "Name"]}}</span>
      of
      <span>{{summary[type + "Title"]}}</span>
      a booking on
      <span>{{readableDate(summary.bookingDate)}}</span>
    </h3>
    <div class="info">
      <span>${{summary.price}}</span>
      <span>
        Status: 
        <span :style="{color: highlight(summary.status)}">
          {{summary.status}}
        </span>
      </span>
      <router-link 
        id='profile-link'
        class="default-link" 
        :to='getProfileLink(summary, type)'>
        View profile
      </router-link>
      <router-link 
        id='booking-link'
        class="default-link" 
        :to="{name: 'booking', params: {id: summary._id}}">
        View booking
      </router-link>
      <ReviewStars :rating="summary[type + 'Rating']"></ReviewStars>
    </div>
    <div class="recent-message">
      <p>{{summary.mostRecentMessage.content}}</p>
      <span>{{readableDate(summary.updatedAt)}}</span>
    </div>
  </div>
</template>

<script>
  import ReviewStars from "@/components/profile/shared/ReviewStars"
  import readableDateMixin from '@/mixins/readableDateMixin'
  
  export default {
    mixins: [readableDateMixin],
    props: ["summary", "type"],
    components: {
      ReviewStars,
    },
    methods: {
      getProfileLink (summary, type) {
        const profileType = summary[type + 'Type'].toLowerCase()
        const profileId = summary[profileType + 'Id']
        console.log(profileType, profileId)
        return {
          name: profileType,
          id: profileId
        }
      },
      highlight(val){
        let color;
        switch(val){
          case "Pending":
          color = 'gold'
          break

          case "Negotiating":
          color = 'blue'
          break
        }

        return color
      }
    }
  }
</script>

<style lang="scss" scoped>
  .booking-summary-item {
    margin: var(--alt-spacing) var(--spacing) var(--alt-spacing) var(--spacing);
    padding: var(--alt-spacing);
    border: var(--light-border);
    border-radius: var(--border-radius);

    h3 {
      span {
        color: var(--primary);
      }
    }

    .info {
      display: inline-block;
      margin: var(--alt-spacing) 0;
      padding: var(--alt-spacing);
      background-color: var(--light-pink);
      border-radius: var(--border-radius);

      & *:not(:last-child) {
        margin-right: var(--spacing);
      }

      &:first-child {
        color: var(--primary);
      }
    }

    .recent-message {
      height: 12vh;
      display: flex;

      p {
        flex: 1;
      }
      
      span {
        flex: 1;
        text-align: right;
        align-self: flex-end;
        margin-left: var(--spacing);
      }
    }
  }
</style>