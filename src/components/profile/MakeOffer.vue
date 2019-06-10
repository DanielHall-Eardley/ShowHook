<template lang="html">
  <form class="booking-form" v-if="showForm"
  @submit.prevent="submitOffer()">
    <input v-model="priceInput"
    placeholder="Enter offer"
    v-on:keyup="validate($event)"/>
    <DatePicker v-model="dateInput"
      v-bind:open-date="getDate()"
      v-bind:disabled-dates="availabilty()"
      includeDisabled=true
      input-class="date-picker"
      :calender-button="retBoolean('true')"
      :typeable="retBoolean('true')">
    </DatePicker>
    <button id="submit-offer-button">Submit</button>
  </form>
</template>

<script>
import DatePicker from "vuejs-datepicker"

export default {
  components:{
    DatePicker,
  },
  props:{
    showForm: Boolean,
    shows: Array
  },
  data(){
    return{
      dateInput: new Date(),
      priceInput: "",
    }
  },
  methods:{
    submitOffer(){
      let payload = {
        offer: this.priceInput,
        date: this.dateInput,
        idOfOffer: "logged in user"
      }
      this.$store.dispatch("addOffer", payload)
    },
    getDate(){
      let d = new Date()
      return d
    },
    validate(e){
      console.log(e)
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
  }
}
</script>

<style lang="scss" scoped>
  .booking-form{
    position: absolute;
    bottom: 100px;
    background: var(--secondary-one);
    padding: var(--spacing);
    border-radius: var(--border-radius);
    display: flex;
  }
</style>
