<template lang="html">
  <section class="booking-form-overlay" v-if="showCalender">
    <div class="booking-form">
      <div class="select-date">
        <h3>Select a date</h3>
        <div class="select-date-container">
          <svg 
            @click="decMonth"
            class="left">
            <use xlink:href="@/assets/sprite.svg#icon-chevron-thin-left"></use>
          </svg>
          <div class="month">
            <h4>{{getMonth.month}}, {{year}}</h4>
            <DateButton
              v-for="n in getMonth.days"
              :disable="checkDate(n, getMonth.takenDays)"
              :key="n"
              :day="n"
              v-on:selectDay="selectedDay = $event"
              >
            </DateButton>
          </div>
          <svg 
            @click="incMonth"
            class="right">
            <use xlink:href="@/assets/sprite.svg#icon-chevron-thin-right"></use>
          </svg>
        </div>
      </div>
      <p class="error" v-if="error">{{error}}</p>
      <div class="submit-offer-container">
        <button class="back-btn" @click="hideCalender">
          Back
        </button>
        <input 
          v-model="priceInput"
          placeholder="Enter offer"
          type="number"
          class="edit-input"
          v-if="offerType.toLowerCase() === 'venue'"
        >
        <button 
          class="submit-offer-btn" 
          @click="createBooking(getMonth.month)"
          :disabled="!selectedDay">
          Book
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  import DateButton from "./DateButton"

  export default {
    components: {
      DateButton
    },
    props: ["shows", "showCalender", "price", "offerReceiverId"],
    data(){
      return{
        priceInput: 0,
        offerType: "Act", //this.$store.state.userConfig.baseUser.userType
        dateArray: [],
        year: "",
        selectedDay: null,
        selectedMonth: 0,
        error: null
      }
    },
    created() {
      //create a calender
      const startDate = new Date()
      const startMonth = parseInt(startDate.getMonth())
      const startYear = startDate.getFullYear()
      const startDay = parseInt(startDate.toString().split(" ")[2])
      const dateArray = []
      const takenDates = {}
      
      /*this function takes the array of shows
      and puts all the show dates into an object,
      sorting them by month*/
      this.shows.forEach(s => {
        //extract month and day from date string
        const showMonth = s.date.toString().split(" ")[1]
        const showDay = parseInt(s.date.toString().split(" ")[2])
        
        //if key (the name of the month) exists add a new day to array
        if (takenDates[showMonth]) {
          return takenDates[showMonth] = [...takenDates[showMonth], showDay]
        }

        //else create an array with with the day inside it
        takenDates[showMonth] = [showDay]
      })

      /*this loop creates a month object which contains the month name,
      calculates the amount of days in that month and adds an
      array of taken days if one exists for the given month*/
      for (let i = startMonth; i < startMonth + 6; i++) {
        const month = new Date().setMonth(i)
        const monthName = new Date(month).toString().split(" ")[1] 
        let takenDays = null

        //add array of booked dates
        if (takenDates[monthName]) {
          takenDays = [...takenDates[monthName]]
        }

        /*if month is first of calender, add days passed
        to array of booked dates - to be disabled*/
        if (startMonth === i) {
          const pastDays = []

          for (let i = 1; i < startDay; i++) {
            pastDays.push(i)
          }

          takenDays = [...pastDays, ...takenDays]
        }

        const monthObj = {
          month: monthName,
          days: new Date(startYear, i, 0).getDate(),
          takenDays,
        }
        
        dateArray.push(monthObj)
      }

      //update state
      this.year = startYear
      this.dateArray = dateArray

    },
    methods:{
      createBooking(month){
        let price = 0
        const date = new Date(this.selectedDay + month + this.year)
        this.selectedDay = null
        this.error = null

        if (this.offerType.toLowerCase() === "venue") {
          if (!this.priceInput) {
            return this.error = "You must include an offer of payment to book this act"
          }
          price = this.priceInput
        }
  
        if (this.offerType.toLowerCase() === "act") {
          price = this.price
        }

        this.$store.dispatch("createBooking", {
          date,
          price,
          offerReceiverId: this.offerReceiverId,
          path: this.$route.fullPath
        })

        this.$emit("hideCalender")
      },
      incMonth(){
        if (this.selectedMonth < this.dateArray.length - 1) {
          this.selectedMonth++
        }
      },
      decMonth(){
        if (this.selectedMonth !== 0) {
          this.selectedMonth--
        }
      },
      checkDate(n, takenDays) {
        if (!takenDays) {
          return false
        }

        for (let day of takenDays) {
          if (n === day) {
            return true
          }
        }

        return false
      },
      hideCalender() {
        this.$emit("hideCalender")
      }
    },
    computed: {
      getMonth() {
        return this.dateArray[this.selectedMonth]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/mixins";

  .booking-form {
    background-color: white;
    padding: var(--spacing);
    border: var(--light-border);
    border-radius: var(--border-radius);
    display: grid;
    grid-row-gap: var(--spacing);

    .error {
      text-align: center;
      font-size: 1.6rem;
      color: red;
    }

    h3 {
      font-size: 2.4rem;
      margin-bottom: var(--alt-spacing);
      text-align: center;
    }

    .select-date-container {
      display: flex;
    
      svg {
        height: 4rem;
        width: 4rem;
        fill: var(--primary);
        align-self: center; 
        transition: all .3s;
        border-radius: var(--border-radius);
        padding: 0 .5rem;

        &:hover {
          background-color: var(--primary);
          fill: white;
        }

        &:active {
          fill: red;
        }
      }

      .right {
        margin-left: var(--spacing);
      }

      .left {
        margin-right: var(--spacing);
      }
    }  
  }

  .submit-offer-container {
    display: flex;

    .submit-offer-btn {
      ;
      margin-left: auto;
    }

    .back-btn {
      ;
    }

    input {
      margin: 0 var(--spacing);
    }
  }

  .month {
    display: grid;
    grid-template-columns: repeat(7, 5rem);

    h4 {
      text-align: center;
      font-size: 2rem;
      padding: var(--alt-spacing) 0;
      grid-column: 1 / -1;
      background-color: lightblue;
    }
  }

  .booking-form-overlay {
    width: 100%;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: .5);
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
