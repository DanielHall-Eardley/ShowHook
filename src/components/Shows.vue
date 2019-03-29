<template>
  <div id="shows" v-bind:style="showPos">
    <h2>Shows</h2>
    <button v-on:click="backToTheFuture('future')">Upcoming</button>
    <button v-on:click="backToTheFuture('past')">Past</button>
    <div v-for="show in filteredArray">
      <span class="show-date">{{show.date}}</span>
      <span class="show-address"><b>{{show.venueName}}</b><br>
      {{show.venueAddress}}</span>
      <button class="show-button"
      v-on:click="addTickets($event)">{{getTicketState(show)}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shows: Object,
    showPos: Object
  },
  data(){
    return{
      filteredArray: this.shows.upcoming,
    }
  },
  methods:{
    backToTheFuture(time){
      if(time === "future"){
        this.filteredArray = this.shows.upcoming
      }else if(time === "past"){
        this.filteredArray = this.shows.past
      }
    },
    getTicketState(show){
      if(show.ticketsOnSale === true && show.ticketCount > show.ticketsPurchased){
        return "Buy Tickets"
      }else if(show.ticketsOnSale === false){
        return( "Upcoming")
      }else if(show.ticketCount === show.ticketsPurchased){
        return "Sold Out"
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

#shows {
  margin: var(--spacing);
  padding: var(--spacing);
  background: var(--secondary-three);
  button{
    margin-right: var(--spacing);
    @include button();
  }
  div {
    display: flex;
    align-items: center;
    padding: 5px 0px;
  }
  h2{
    margin: 5px;
  }
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
</style>
