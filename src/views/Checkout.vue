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
      this.$store.dispatch('payBooking', {
        bookingId: this.$route.params.id
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