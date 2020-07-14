import postDataFn from '@/helper/postDataFn'

export default {
  methods: {
    async createTicketPayment(showId) {
      this.$store.commit('clearError')
     
      const token = this.$store.state.token
      const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
  
      const body = JSON.stringify({
        userId: this.$store.state.baseUser.userId,
        profileType: this.$store.state.baseUser.userType,
        showId,
      })

      const response = await postDataFn(`/payment/ticket/create`, body, headers, 'POST')
  
      if (response.error) {
        return this.$store.commit('updateError', response.error)
      }

      this.$store.commit('loadTicket', {ticket: response.ticket})
      this.redirectToCheckout(response.ticket._id)
    },
    redirectToCheckout(ticketId) {
      this.$router.push({
        name: 'checkout', 
        params: {
          type: 'ticket',
          id: ticketId
        },
      })
    }
  }
}