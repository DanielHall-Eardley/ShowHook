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
            <h4>{{dateArray[selectedMonth].monthName}}, {{year}}</h4>
            <DateButton
              v-for="n in dateArray[selectedMonth].days"
              :disable="checkDate(n, dateArray[selectedMonth].takenDays)"
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
      <div class="submit-booking-container">
        <textarea 
          class="default-input"
          placeholder="Add an introductory message"
          v-model="message">
        </textarea>
        <button class="alt-button" @click="hideCalender">
          Back
        </button>
        <button 
          class="primary-button" 
          @click="createBooking(dateArray[selectedMonth].monthNumber)"
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
    props: ["shows", "showCalender", "price", "receiverId"],
    data(){
      return {
        message: "",
        bookingType: this.$store.state.baseUser.userType,
        dateArray: [],
        year: null,
        selectedDay: null,
        selectedMonth: 0,
        error: null
      }
    },
    created() {
      //create a calender
      const startDate = new Date()
      const startMonth = parseInt(startDate.getMonth())
      let months = startMonth + 3
      const startYear = parseInt(startDate.getFullYear())
      const startDay = parseInt(startDate.toString().split(" ")[2])
      const array = []
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
      for (let i = startMonth; i < months; i++) {
        //allow for an overlap into a new year
        if (i > 11) {
          months = months - i
          i = 0
        }

        const month = new Date().setMonth(i)
        const monthName = new Date(month).toString().split(" ")[1] 
        let takenDays = []
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
          monthName: monthName,
          monthNumber: i,
          days: new Date(startYear, i, 0).getDate(),
          takenDays,
        }
        array.push(monthObj)
      }
      //update state
      this.year = startYear
      this.dateArray = array
    },
    methods:{
      createBooking(month){
        const date = new Date(this.year, month, this.selectedDay)
        console.log(date)
        this.selectedDay = null
        this.error = null

        this.$store.dispatch("createBooking", {
          date,
          message: this.message,
          receiverId: this.receiverId,
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
        if (!takenDays.length) {
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
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .booking-form {
    background-color: white;
    padding: var(--spacing);
    border: var(--light-border);
    border-radius: var(--border-radius);

    h3 {
      font-size: 2.4rem;
      margin-bottom: var(--alt-spacing);
      text-align: center;
    }

    .select-date-container {
      display: flex;
      margin-bottom: var(--spacing);

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

  .submit-booking-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    textarea {
      height: 15vh;
      margin-bottom: var(--spacing);
      padding: var(--alt-spacing)
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
