<template lang="html">
  <div class="book-show">
    <div class="price">
      <span>${{price}}</span> 
      per night
    </div>
    <div class="buttons">
      <MakeOffer 
        :shows="shows"
        :showCalender="showCalender"
        :price="price"
        :offerReceiverId="profileId"
        v-on:hideCalender="showCalender = false">
      </MakeOffer>
      <button @click="showCalender = true" class="primary-button">
        Book
      </button>
      <button class="primary-button">
        Save to wishlist
        </button>
      <router-link to="/contact/:id" class="default-link">
        Contact
      </router-link>
    </div>
  </div>
</template>

<script>
import MakeOffer from "./MakeOffer.vue"

export default {
  components:{
    MakeOffer
  },
  props: ["price", "profileId"],
  data(){
    return{
      toggleOfferForm: false,
      showCalender: false,
      shows: [
        {title: "some Show", date: new Date("April 23 2020")},
        {title: "some Show", date: new Date("March 23 2020")},
        {title: "some Show", date: new Date("January 23 2020")},
        {title: "some Show", date: new Date("January 3 2020")},
        {title: "some Show", date: new Date("January 26 2020")}
      ]
    }
  },
  computed: {
    getUser() {
      const user = this.$store.state.userConfig.baseUser

      if (!baseUser.userId) {
        this.$router.push({
          name: "admin",
          query: {type: "login"},
          params: {redirect: "conversation/" + this.venueId}
        })
      }
      return user
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper.scss";

  .book-show{
    position: sticky;
    bottom: 0;
    display: flex;
    
    z-index: 3;

    .price {
      background-color: var(--primary);
      padding:var(--alt-spacing);
      font-size: 1.5rem;
      color: white;

      span {
        padding: 0;
        font-size: 2.75rem;
        font-weight: 100;
      }
    }
    .buttons {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background-color: var(--light-grey);
      padding: var(--alt-spacing);

      button, a{
        text-decoration: none;
        font-size: 1.5rem;

        &:not(:last-child) {
          margin-right: var(--spacing);
        }
      }
    }
  }
</style>
