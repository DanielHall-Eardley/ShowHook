<template>
  <div class="show-header">
    <h2>
      <span class='highlight-pink'>{{show.actTitle}}</span>
      <span> is performing at </span>
      <span class='highlight-pink'>{{show.venueTitle}}</span>
      <span> on </span>
      <span class='highlight-pink'>{{readableDate(show.showDate)}}</span>
    </h2>
    <p>{{show.description}}</p>
    <div class="tickets">
      <span>Tickets Remaining: {{show.numberOfTickets - show.ticketsPurchased}}</span>
      <span>Tickets Purchased: {{show.ticketsPurchased}}</span>
      <span>Ticket Price: ${{show.ticketPrice}}</span>
       <router-link 
        :to="{
          name: 'venue', 
          params: {id: show.venueId},
          query: {idType: '_id'}
        }"
        class='default-link'>
        View Venue
      </router-link>
      <router-link 
        :to="{
          name: 'act', 
          params: {id: show.actId},
          query: {idType: '_id'}
        }"
        class='default-link'>
        View Act
      </router-link>
      <button @click='createTicketPayment(show._id)' class="primary-button">
        Buy Ticket
      </button>
    </div>
  </div>
</template>

<script>
import formatDate from '@/helper/formatDate'
import ticketMixin from '@/mixins/ticketMixin'

export default {
  mixins: [ticketMixin],
  props: [
    'show'
  ],
  methods: {
    readableDate(date) {
      return formatDate(date, true)
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '@/globalStyles/helper';

  .show-header {
    padding: var(--spacing);
    border-bottom: var(--light-border);

    h2 {
      font-family: var(--heading-font);
      font-size: 2.5rem;
      margin-bottom: var(--alt-spacing);
    }

    p {
      font-size: 1.9rem;
      margin-bottom: var(--alt-spacing);
    }
  }

  .tickets {
    display: inline-block;
    padding: var(--alt-spacing) 0;
    background-color: var(--light-pink);
    border-radius: var(--border-radius);
    font-size: 1.8rem;

    & > * {
      margin-left: var(--spacing);
    }

    button {
      margin-right: var(--alt-spacing);
    }
  }
</style>
