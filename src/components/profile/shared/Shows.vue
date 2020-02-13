<template>
  <div class="shows" v-bind:style="showPos">
    <h3 class="paragraph-heading">Shows</h3>
    <div v-for="show in shows" :key="show._id">
      <span class="show-date">{{show.date}}</span>
      <span class="show-address"><b>{{show.venueName}}</b><br>
      {{show.venueAddress}}</span>
      <router-link class='show-details'
        :to="{ name: 'show-details', params: {showId: show.id}}">
        Show Details
      </router-link>
      <button class="primary-button"
      v-on:click="addTickets($event)">{{getTicketState(show)}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shows: Array,
    showPos: Object
  },
  methods:{
    getTicketState(show){
      if(show.ticketsOnSale && show.ticketCount > show.ticketsPurchased){
        return "Buy Tickets"
      }else if(show.ticketsOnSale === false){
        return "Upcoming"
      }else if(show.ticketCount === show.ticketsPurchased){
        return "Sold Out"
      }else if(new Date(show.date) < new Date()){
        return "Not Available"
      }
    },
    addTickets(e){
      this.$store.dispatch("addTickets", e)
    }
  }
};
</script>

<style lang="scss">
@import "@/globalStyles/mixins.scss";

.shows{
  padding: var(--spacing);
  border-bottom: var(--light-border);

  button{
    margin-right: var(--spacing);
    font-size: 1rem;
  }
  div{
    display: flex;
    align-items: center;
    padding: 5px 0px;
  }
  h2{
    margin: 5px;
  }
  .show-date{
    flex: 1
  }
  .show-address{
    flex: 2;
  }
  .show-button{
    flex: 0.5;
  }
  .show-details{
    margin-right: var(--spacing);
  }
}


</style>
