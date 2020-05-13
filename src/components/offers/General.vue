<template lang="html">
  <section class="general">
    <h2 class="subheading">
      <span>General</span>
      <svg v-if="!showSection" @click="showSection = !showSection">
        <use xlink:href="@/assets/sprite.svg#icon-triangle-down"></use>
      </svg>
      <svg v-else @click="showSection = !showSection">
        <use xlink:href="@/assets/sprite.svg#icon-triangle-up"></use>
      </svg>
    </h2>
    <div class="expand-container" v-show="showSection">
      <label for="">Title</label>
      <input 
        type="text" 
        class="default-input"
        name='title'
        v-model='title'
        :placeholder="showSetup.title || 'Add a title for the show'"
        v-on:change='updateShow($event)'>
      <label for="">Description</label>
      <textarea 
        :placeholder="showSetup.description || 'Add a description for the show'"
        class="default-input"
        name='description'
        v-model='description'
        v-on:change='updateShow($event)'>
      </textarea>
      <label for="">Select price type</label>
      <select 
        class="default-input select-price-type" 
        v-model="priceType"
        v-on:change="updateShow($event)"
        name="priceType">
        <option>Split</option>
        <option>Fixed</option>
      </select>
      <div class="profits" v-if='priceType === "Split"'>
        <label for="">Profit Split</label>
        <span>Act</span>
        <input 
          class='default-input'
          type="number" 
          :value='actProfit'
          name='act' 
          v-on:input="changePercentage($event)"
          v-on:change="updatePercentage">
        <span>Venue</span>
        <input 
          class='default-input'
          type="number"
          name='venue' 
          :value='venueProfit' 
          v-on:input="changePercentage($event)"
          v-on:change="updatePercentage">
      </div>
      <label for="">Price</label>
      <input 
        type="number" 
        class="default-input"
        name='price'
        v-model='price'
        :placeholder="showSetup.price || 'Add a price for the show'"
        v-on:change='updateShow($event)'>
      <label for="">Ticket price</label>
      <input 
        type="number" 
        class="default-input"
        name='ticketPrice'
        v-model='ticketPrice'
        :placeholder="showSetup.ticketPrice || 'Add ticket price'"
        v-on:change='updateShow($event)'>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      showSection: false,
      title: "",
      description: "",
      price: 0,
      priceType: "Select price type",
      ticketPrice: 0,
      actProfit: 50,
      venueProfit: 50
    }
  },
  props: ["show"],
  methods:{
    updateShow(e){
      const key = e.target.name
      const payload = {
        key,
        value: this[key]
      }

      this.$store.commit("updateShowSetup", payload)
    },
    changePercentage (e) {
      const type = e.target.name 
      const input = e.target.value
      const max = 100

      if ((max - input) < 0) {
        alert('Invalid profit amount')
        this.actProfit = 50
        this.venueProfit = 50
        return 
      }

      if (type === 'act') {
        this.actProfit = Math.floor(input)
        this.venueProfit = Math.floor(100 - input)
      } else if (type === 'venue') {
        this.actProfit = Math.floor(100 - input)
        this.venueProfit = Math.floor(input)
      }
    },
    updatePercentage () {
      const payload = {
        actProfit: this.actProfit,
        venueProfit: this.venueProfit
      }

      this.$store.commit("updateShowProfits", payload)
    }
  },
  computed: {
    showSetup () {
      return this.$store.state.userConfig.showSetup
    }
  }
}
</script>

<style lang="scss">
@import '../../globalStyles/helper.scss';

.subheading{
  color: var(--primary);
  font-weight: 100;
  display: flex;

  svg{
    height: 3.5rem;
    width: 3.5rem;
    fill: var(--primary);
    margin-left: auto;
  }
}

.general{
  padding: var(--spacing);
  border-bottom: var(--light-border);

  textarea {
    height: 12rem;
  }
}

.select-price-type {
  height: 4rem;
}

.expand-container {
  display: grid;
  grid-row-gap: var(--alt-spacing);
}

.profits {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: var(--alt-spacing);
  position: relative;

  label {
    grid-column: 1 / -1;
  }

  input:first-of-type {
    text-align: right;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: var(--light-border);
  }

  input:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  span {
    position: absolute;
  }

  span:first-of-type {
    bottom: 1rem;
    left: var(--alt-spacing)
  }

  span:last-of-type {
    bottom: 1rem;
    right: var(--alt-spacing)
  }
}
</style>
