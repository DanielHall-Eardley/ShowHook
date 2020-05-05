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
      a booking on
      <span>{{formatDate(summary.bookingDate, false)}}</span>
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
        class="default-link" 
        :to="{
          name: getProfiletype, 
          params: {id: summary[type + 'Id']},
          query: {idType: 'userId'}
        }">
        View profile
      </router-link>
      <router-link 
        class="default-link" 
        :to="{name: 'offer', params: {id: summary._id}}">
        View offer
      </router-link>
      <ReviewStars :rating="summary[type + 'Rating']"></ReviewStars>
    </div>
    <div class="recent-message">
      <p>{{summary.mostRecentMessage.content}}</p>
      <span>{{formatDate(summary.updatedAt, true)}}</span>
    </div>
  </div>
</template>

<script>
  import ReviewStars from "@/components/profile/shared/ReviewStars"

  export default {
    props: ["summary", "type"],
    components: {
      ReviewStars,
    },
    computed: {
      getProfiletype() {
        const currentUserType = this.$store.state.userConfig.baseUser.userType 

        if (currentUserType === "Venue") {
          return "act"
        }

        return "venue"
      }
    },
    methods: {
      formatDate(date, addTime) {
        let options = {
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        }

        if (addTime) {
          options = {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: "numeric",
            minute: "numeric"
          }
        }

        return new Date(date).toLocaleString("en-CA", options)
      },
      highlight(val){
        let color;
        switch(val){
          case "Accepted":
          color = 'green'
          break

          case "Pending":
          color = 'gold'
          break

          case "Negotiating":
          color = 'blue'
          break

          case "Rejected":
          color = 'grey'
          break

          case "Updated":
          color = 'red'
          break
        }

        return color
      }
    }
  }
</script>

<style lang="scss" scoped>
  .offer-summary-item {
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