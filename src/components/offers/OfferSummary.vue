<template lang="html">
  <section class="offer">
    <form action="" class="offer-summary">
      <span class="offer-sender"><b>Offer from: </b>{{offer.sender}}</span>
      <span class="offer-receiver"><b>To: </b>{{offer.receiver}}</span>
      <span class="offer-date"><b>On: </b>{{offer.date}}</span>
      <span class="offer-payment"><b>For: </b>${{offer.payment}}</span>
      <span class="offer-status">
        <b>Status: </b>{{!offer.status ? 'Pending' : 'Accepted'}}
      </span>
      <button class="offer-submit">Submit Offer</button>
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
@import '../../globalStyles/mixins.scss';

.offer{
  width: 100%;
  font-size: 1.6rem;
  border-bottom: var(--light-border);

  &-summary{
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: var(--spacing);
    justify-items: center;

    color: var(--alt-primary);
    border-radius: var(--border-radius);
    padding: var(--spacing);
  }

  &-sender{

  }

  &-receiver{

  }

  &-date{

  }

  &-payment{

  }

  &-submit{
    @include button;
  }
}
</style>
