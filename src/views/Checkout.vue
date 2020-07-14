<template>
  <main class="checkout">
    <Error/>
    <div class="overlay" v-show='disabled' role='alert'>
      Processing, please do not navigate away from or refresh this page
    </div>
    <h1>Checkout</h1>
    <Ticket :ticket='ticket' pageName='checkout' v-if='paymentType === "ticket"'/>
    <form id='payment-form' v-on:submit.prevent='confirmPayment(ticket.paymentIntentId)'>
      <div id="card-element"></div>
      <div id="card-errors" role='alert'></div>
      <button :class='!disabled ? "primary-button": "alt-button"' id='submit' :disabled='disabled'>
        Pay
      </button>
      <button class="alt-button" @click='navigateHome()' type='button'>Cancel</button>
    </form>
  </main>
</template>

<script>
import {stripeApiKey} from '@/global.js'
import Ticket from '@/components/shared/Ticket'
import postDataFn from '../helper/postDataFn';
import checkLoginMixin from '@/mixins/checkLoginMixin'
import Error from '@/components/shared/Error'

const stripeStyles = {
  base: {
    iconColor: '#c4f0ff',
    color: '#555555',
    fontWeight: 500,
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '22px',
    '::placeholder': {
      color: '#555555',
    }
  },
  invalid: {
    iconColor: '#7c2051',
    color: '#7c2051',
  },
  complete: {
    iconColor: '#ee7396',
    color: '#ee7396',
  },
}

export default {
  mixins: [checkLoginMixin],
  components: {
    Ticket,
    Error
  },
  data() {
    return {
      stripe: Stripe(stripeApiKey),
      cardElement: null,
      stripeInit: false,
      paymentType: null,
      disabled: false
    }
  },
  async created () {
    await this.checkLogin()

    const paymentType = this.$route.params.type
    if (paymentType === 'ticket') {
      this.getTicket()
      this.paymentType = paymentType
    }
  },
  methods: {
    navigateHome() {
      this.$router.push('/')
    },
    async confirmPayment(paymentId) {
      this.disabled = true
      this.$store.commit("clearError")

      const paymentResult = await this.stripe.confirmCardPayment(paymentId, {
        payment_method: {
          card: this.cardElement,
          billing_details: {
            name: 'Daniel Hall-Eardley'
          }
        }
      })
     
      if (paymentResult.error) {
        this.disabled = false
        return this.$store.commit('updateError', paymentResult.error.message)
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          this.savePurchase(paymentResult.paymentIntent.id)
        }
      }
    },
    async savePurchase (paymentId) {
      const token = this.$store.state.token
      const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }

      const body = JSON.stringify({
        userId: this.$store.state.baseUser.userId,
        profileType: this.$store.state.baseUser.userType,
        id: this.$route.params.id,
        paymentId
      })

      const response = await postDataFn(`payment/${this.paymentType}/purchase`, body, headers, 'POST')

      if (response.error) {
        this.disabled = false
        return this.$store.commit("updateError", response)
      }

      this.disabled = false
      alert(response.msg)
      this.redirect(response.redirect.routeName, response.redirect.id)
    },
    redirect (routeName, id) {
      this.$router.push({
        name: routeName, 
        params: {id},
      })
    },
    async getTicket() {
      const checkTicket = this.$store.state.ticket
      if (checkTicket._id) {
        return checkTicket
      }

      const userId = this.$store.state.baseUser.userId
      const profileType = this.$store.state.baseUser.userType
      const ticketId = this.$route.params.id

      const body = JSON.stringify({
        ticketId,
        userId,
        profileType
      })

      const headers = {
        'Authorization': 'Bearer ' + this.$store.state.token,
        'Content-Type': 'application/json'
      }

      const response = await postDataFn(`payment/ticket/`, body, headers, 'POST')
      if (response.error) {
        return this.$store.commit('updateError', response.error)
      }

      if (response.ticket.paymentComplete) {
        return this.$router.push({
          name: 'admin-profile',
          params: {
            id: response.ticket.ticketHolderId
          }
        })
      }
      this.$store.commit('loadTicket', {ticket: response.ticket})
    }
  },
  updated() {
    if (this.stripe && !this.stripeInit) {
      const elements = this.stripe.elements()
      const card = elements.create('card', {style: stripeStyles})
      card.mount('#card-element')
      
      card.on('change', ({error}) => {
        const displayError = document.getElementById('card-errors');
        if (error) {
          displayError.textContent = error.message;
        } else {
          displayError.textContent = '';
        }
      })

      this.stripeInit = true
      this.cardElement = card
    }
  },
  computed: {
    ticket() {
      return this.$store.state.ticket
    },
  }
}
</script>

<style scoped>
  main {
    padding: var(--spacing);
  }

  .overlay {
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2.5rem;
    z-index: 5;
  }

  main h1 {
    text-align: center;
    color: var(--primary);
    margin-bottom: var(--spacing);
    font-size: 2.5rem;
  }

  #card-element {
    background-color: var(--light-pink);
    padding: var(--spacing);
    margin-bottom: var(--alt-spacing);
  }

  #payment-form button:last-of-type {
    margin-left: var(--spacing);
  }

  #card-errors {
    font-size: 1.8rem;
    margin-bottom: var(--alt-spacing);
    color: var(--secondary-three);
  }
</style>