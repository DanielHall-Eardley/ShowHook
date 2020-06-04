<template>
  <main class="checkout">
    Coming soon: Pay with Stripe
    <button @click='payBooking'>Continue</button>
  </main>
</template>

<script>
export default {
  methods: {
    payBooking () {
      this.$store.dispatch('pay', {
        bookingId: this.$route.params.bookingId,
        showId: this.$route.params.showId,
        paymentType: this.$route.query.paymentType
        //add Stripe payment details
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
  }
</style>