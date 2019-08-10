<template lang="html">
  <section class="general">
    <h2 class="subheading">Payment Type</h2>

    <div class="general-payment-type">
      <input type="radio"
        id="guarantee"
        name="paymentType"
        value="guarantee"
        checked
        v-on:input="updateOffer($event)">
      <label for="guarantee" class="input-label left">Guarantee</label>
      <input type="radio"
        id="split"
        name="paymentType"
        value="split"
        v-on:input="updateOffer($event)">
      <label for="split" class="input-label right">
        Split <span class="percentage">%</span>
      </label>
    </div>

    <div class="general-payment" v-if="offer.paymentType === 'guarantee'">
      <label for="general-payment-input" class="general-payment-label">
        Fixed Price
      </label>
      <input type="text"
        class='edit-input general-payment-input'
        id="general-payment-input"
        name="payment"
        :placeholder="'$' + offer.payment"
        v-on:input="updateOffer($event)">
    </div>

    <div class="general-percentage" v-else>
      <label for="act" class="general-percentage-label">
        Act %
      </label>
      <input type="text"
        class='edit-input general-percentage-input'
        id="act"
        name="actPercentage"
        :placeholder="offer.actPercentage + '%'"
        v-on:input="updateOffer($event)">
      <label for="venue" class="general-percentage-label">
        Venue %
      </label>
      <input type="text"
      class='edit-input general-percentage-input'
      id="venue"
      name="venuePercentage"
      :placeholder="offer.venuePercentage + '%'"
      v-on:input="updateOffer($event)">
    </div>
  </section>
</template>

<script>
export default {
  computed:{
    offer(){
      return this.$store.state.userConfig.offer
    },
  },
  methods:{
    updateOffer(e){
      this.$store.commit("updateOffer", e.target)
    }
  }
}
</script>

<style lang="scss">
@import '../../globalStyles/helper.scss';
@import '../../globalStyles/mixins.scss';

.subheading{
  border-bottom: solid .5px var(--alt-primary);
  color: var(--primary);
  font-weight: 100;
  padding-bottom: var(--spacing);
}

.general{
  background-color: white;
  border-radius: var(--border-radius);
  padding: var(--spacing);
  box-shadow: var(--box-shadow-default);

  grid-column: col-start 1 / span 2;
  justify-self: stretch;
  align-self: start;
  display: grid;
  grid-row-gap: var(--alt-spacing);

  &-payment-type{
    #guarantee, #split{
      display: none;
    }

    .input-label{
      padding: .5rem 1rem;
      transition: all .3s;
      display: inline-block;
      border: solid .5px var(--primary);
      font-size: 1.4rem;
    }

    .left{
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }

    .right{
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
      border-left: 0;
    }

    input:checked + .input-label{
      background-color: var(--primary);
    }

    input:not(:checked) + .input-label{
      background-color: white;
      color: var(--alt-primary);
    }

    .percentage{
      font-weight: 600;
    }
  }

  &-payment, &-percentage{
    display: grid;
    grid-row-gap: .5rem;
  }

  &-payment-input, &-percentage-input{
    width: 15rem;
  }
}
</style>
