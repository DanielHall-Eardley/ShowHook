<template lang="html">
  <section class="offer">
    <form action="" class="offer-summary">
      <span class="offer-sender"><b>Offer from: </b>{{offer.sender}}</span>
      <span class="offer-receiver"><b>To: </b>{{offer.receiver}}</span>
      <span class="offer-date"><b>On: </b>{{offer.date}}</span>
      <span class="offer-payment"><b>For: </b>${{offer.payment}}</span>
      <span class="offer-status">
        <b>Status: </b>{{!offer.status ? 'Pending' : 'Accepted'}}
      </span>
      <!--<button class="offer-submit">Submit Offer</button>!-->
      <button type="button" class="offer-details" v-on:click="toggleDetails()">
        View Details
      </button>
      <General v-show='showDetails'></General>
      <Schedule v-show='showDetails'></Schedule>
      <Other v-show='showDetails'></Other>
    </form>
  </section>
</template>

<script>
import General from "@/components/offers/General.vue"
import Schedule from "@/components/offers/Schedule.vue"
import Other from "@/components/offers/Other.vue"

export default {
  computed:{
    offer(){
      return this.$store.state.userConfig.offer
    }
  },
  components:{
    General,
    Schedule,
    Other
  },
  data(){
    return{
      showDetails: false
    }
  },
  methods:{
    toggleDetails(){
      this.showDetails = !this.showDetails
    }
  }
}
</script>

<style lang="scss">
@import '../../globalStyles/mixins.scss';

.offer{
  width: 100%;
  font-size: 1.6rem;

  &-summary{
    display: grid;
    align-items: center;
    grid-template-columns: repeat(6, [col-start] 1fr [col-end]);
    grid-gap: var(--spacing);
    justify-items: center;

    background-color: var(--light-pink);
    color: var(--alt-primary);
    border-radius: var(--border-radius);
    padding: var(--spacing);
  }

  &-sender{

  }

  &-receiver{

  }

  &-date{

  }

  &-payment{

  }

  &-details{
    @include button;
  }
}
</style>
