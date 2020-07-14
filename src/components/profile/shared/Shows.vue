<template>
  <div class="shows" >
    <h2 class='paragraph-heading'>Shows</h2>
    <ul class='show-list'>
      <li 
        v-for='show in shows' 
        :key='show._id' 
        class='show'
        :class='{"future-show": checkShowDate(show.showDate)}'>
        <h3>{{show.title}}</h3>
        <span>{{readableDate(show.showDate)}}</span>
        <router-link 
          class='default-link'
          :to='{name: linkType, params: {id: profileId}}'>
          {{show[linkType + 'Title']}}
        </router-link>
        <span>
          {{
            checkTicketAvailable(show.ticketsPurchased, show.numberOfTickets) ? 
            show.numberOfTickets - show.ticketsPurchased + ' Tickets remaining' :
            'Sold out'
          }}
        </span>
        <button 
          v-if='checkUserType()'
          @click='createTicketPayment(show._id)'
          :disabled='!checkShowDate(show.showDate)' 
          :class='{
            "btn-disabled": !checkShowDate(show.showDate),
            "primary-button": checkShowDate(show.showDate) && checkTicketAvailable
          }'>
          Buy Ticket: ${{show.ticketPrice}}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import getDataFn from '@/helper/getDataFn'
import formatDate from '@/helper/formatDate'
import ticketMixin from '@/mixins/ticketMixin'
import {isFuture} from 'date-fns'

export default {
  mixins: [ticketMixin],
  props: ['userId', 'linkType', 'profileId'],
  data() {
    return {
      shows: []
    }
  },
  async created() {
    this.$store.commit('clearError')

    const response = await getDataFn(`/show/summary/act-or-venue/${this.userId}`)
      
    if (response.error) {
      return this.$store.commit('updateError', response.error) 
    }
 
    this.shows = response.shows
  },
  methods:{
    checkUserType() {
      const routeType = this.$route.name.split('-')[0]
      
      if (routeType === 'admin') {
        return false
      }

      return true
    },
    readableDate(date) {
      return formatDate(date, true)
    },
    checkShowDate(date) {
      return isFuture(new Date(date))
    },
    checkTicketAvailable(ticketsRemaining, totalTickets) {
      if (totalTickets - ticketsRemaining > 0) {
        return true
      }
      return false
    }
  }
};
</script>

<style scoped>
.shows{
  padding: var(--spacing);
  border-bottom: var(--light-border);
}

.show-list {
  list-style: none;
}

.show {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--border-radius);
  padding: var(--alt-spacing);
  font-size: 1.6rem;
  background-color: var(--light-grey);
  color: var(--secondary-six);
}

.show:not(:last-child) {
  margin-bottom: var(--alt-spacing);
}

.future-show {
  color: var(--alt-primary);
}
</style>
