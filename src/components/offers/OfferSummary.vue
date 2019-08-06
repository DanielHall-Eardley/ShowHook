<template lang="html">
  <section class="offer">
    <form action="" class="offer-form">
      <span class="offer-sender">Offer from:{{offer.sender}}</span>
      <span class="offer-receiver">To: {{offer.receiver}}</span>
      <span class="offer-date">{{offer.date}}</span>
      <span class="offer-payment">{{offer.payment}}</span>
      <button class="offer-payment-type">
        <input type="text" id="guarantee" name="payment" ty>
        <label for="guarantee" class="input-label-g">Guarantee</label>
        <input type="text" id="split" name="payment">
        <label for="split" class="input-label-s">
          Split <span class="percentage">%</span>
        </label>
      </button>
      <span class="offer-status"></span>
      <button class="offer-submit"></button>
    </form>
  </section>
</template>

<script>
export default {
  computed:{
    offer(){
      return this.$store.state.userConfig.offer
    }
  }
}
</script>

<style lang="scss">


.offer{

  &-form{

  }

  &-sender{

  }

  &-receiver{

  }

  &-date{

  }

  &-payment{

  }

  &-payment-type{
    
  }

  &-submit{

  }
}
</style>
