<template>
  <article class='ticket'>
    <h2 class='heading'>
      <span>This ticket is to see</span>
      <router-link class='pink-highlight' :to='{name: "act", params: {id: ticket.actId}}'>
        {{ticket.actTitle}}
      </router-link>
      <span> perform at </span>
      <router-link class='pink-highlight' :to='{name: "venue", params: {id: ticket.venueId}}'>
        {{ticket.venueTitle}}
      </router-link>
      <span> on </span>
      <span class='pink-highlight'>{{readableDate(ticket.showDate, true)}}</span>
    </h2>
    <ul class='list'>
      <li><b>Ticket Id:</b> #{{ticket._id}}</li>
      <li><b>Price: </b>${{ticket.price}}</li>
      <li><b>Address:</b> {{ticket.address}}</li>
      <li><b>Status:</b> {{!ticket.paymentComplete ? 'Awaiting payment': 'Confirmed'}}</li>
    </ul>
    <nav>
      <router-link class='default-link' :to='{name: "show", params: {id: ticket.showId}}'>
        Show details
      </router-link>
      <router-link class='default-link' :to='{name: "checkout", params: {type: "ticket", id: ticket._id}}'
        v-if='!ticket.paymentComplete && pageName !== "checkout"'>
        Complete Payment
      </router-link>
      <button 
        @click='markTicketAttended(ticket._id)' 
        class='default-link' 
        v-if='!ticket.attended && pageName === "venue"'>
        Mark as attended
      </button>
    </nav>
  </article>
</template>

<script>
import readableDateMixin from '@/mixins/readableDateMixin'
import postDataFn from '@/helper/postDataFn'

export default {
  mixins: [readableDateMixin],
  props: ['ticket', 'pageName'],
  methods: {
    async markTicketAttended(ticket) {
      const adminVenueId = this.$store.state.baseUser.userId 

      const body = JSON.stringify({
        ticketId: this.ticket._id,
        adminVenueId
      })

      const headers = {
        'Authorization': 'Bearer ' + this.$store.state.token,
        'Content-Type': 'application/json'
      }

      const response = await postDataFn('/admin/ticket/attended', body, headers, 'POST')
      if (response.error) {
        this.$store.commit('updateError', response.error)
      }

      this.$store.commit('loadTicket', {ticket: response.ticket})
    }
  }
}
</script>

<style scoped>
  .ticket {
    border: var(--pink-border);
    margin-bottom: var(--spacing);
  }

  .heading {
    padding: var(--alt-spacing);
    background-color: var(--light-pink);
    font-size: 2rem;
  }

  .heading a {
    text-decoration: none;
  }

  .list {
    list-style: none;
    font-size: 1.8rem;
    padding: var(--spacing) var(--alt-spacing);
  }

  .list li:not(:last-child) {
    margin-bottom: .5rem;
  }

  nav {
    margin-left: var(--alt-spacing);
    margin-bottom: var(--alt-spacing);
    display: flex;
  }

  nav a, nav button {
    font-size: 1.8rem !important;
    margin-right: var(--spacing);
  }

  nav button {
    margin-left: auto;
  }
</style>