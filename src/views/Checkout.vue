<template>
  <main class="checkout">
    Add Stripe 
    <button @click='payBooking'>Pay</button>
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

</style>