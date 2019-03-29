<template lang="html">
  <div id="book-show" v-bind:style="bookPos">
    <h3>{{price}} CAD per night</h3>
    <div id="offer-wrapper">
      <label for="">Show available dates</label>
      <DatePicker
      v-bind:open-date="getDate()"
      v-model="dateInput"
      v-bind:disabledDates="availabilty()"
      v-bind:typeable="retBoolean('true')"
      includeDisabled=true
      >
      </DatePicker>
      <router-link v-bind:to="{name: 'booking', params: {id: id, date: dateInput}}">
          Book
      </router-link>
      <button v-if="type === 'act' ? true : false"
      v-on:click="showForm">
        {{toggleOfferForm === true ? "Back" : "Make an Offer"}}
      </button>
      <form id="booking-form" v-if="toggleOfferForm"
      @submit.prevent="submitOffer()">
        <DatePicker v-model="dateInput"
          v-bind:open-date="getDate()"
          v-bind:disabled-dates="availabilty()"
          includeDisabled=true
          input-class="date-picker"
          :calender-button="retBoolean('true')"
          :typeable="retBoolean('true')">
        </DatePicker>
        <div id="submit-offer">
          <input v-model="priceInput"
            placeholder="$"
            v-on:keyup="validate($event)"/>
          <button id="submit-offer-button">Submit</button>
        </div>
      </form>
      <label>You won't be charged yet</label>
      <button class="alt-button">Save to wishlist</button>
      <router-link to="/contact/:id">
        Contact {{type === "venue" ? "venue" : "act"}}
      </router-link>
    </div>
  </div>
</template>

<script>
import DatePicker from "vuejs-datepicker"

export default {
  components:{
    DatePicker,
  },
  props:{
    bookPos: Object,
    price: String,
    type: String,
    shows: Array,
    id: String
  },
  data(){
    return{
      toggleOfferForm: false,
      dateInput: new Date(),
      priceInput: 0,
    }
  },
  methods:{
    getDate(){
      let d = new Date()
      return d
    },
    validate(e){
      console.log(e)
    },
    showForm(){
      this.toggleOfferForm = !this.toggleOfferForm
    },
    availabilty(){
      let dateArray = this.shows.map(el=>{
         return new Date(el.date)
      })
      let dateObject = {
        dates: dateArray,
      }
      return dateObject
    },
    retBoolean(bool){
      if(bool === "true"){
        return true
      }else{
        return false
      }
    },
    submitOffer(){
      let payload = {
        offer: this.priceInput,
        date: this.dateInput,
        idOfOffer: "logged in user"
      }
      this.$store.dispatch("addOffer", payload)
    }
  }
}
</script>

<style lang="scss">
@import "@/globalStyles/mixins.scss";

  #book-show{
    position: relative;
    bottom: 62px;
    height: 120%;
    border: solid 1px var(--alt-primary);
    display: flex;
    flex-direction: column;
    margin-right: var(--spacing);
    h3{
      background: var(--alt-primary);
      color: white;
      margin: 0px;
      padding: 20px;
      text-align: center;
    }
    #offer-wrapper{
      flex: 1;
      padding: var(--spacing);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    button, a:first-of-type{
      @include button();
      text-align: center;
    }
    a{
      text-align: center;
    }
  }

  #booking-form{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    #submit-offer{
      display: flex;
    }
    #submit-offer-button{
      @include alt-button()
    }
  }

</style>
