<template lang="html">
  <div class="booking-page">
    <Menu></Menu>
    <Error errorType="error"></Error>
    <header v-if="booking.status === 'Pending'">
      <h1>
        {{
          checkUserType === "receiver" ? 
          "Accept to begin negotiations with " + booking.offerorName + " of " + booking.offerorTitle :
          "Awaiting a response from " + booking.receiverName + " of " + booking.receiverTitle
        }}
      </h1>
      <div class="button-container">
        <button class="alt-button" @click="deleteBooking(booking._id)">
          {{checkUserType === "receiver" ? "Reject" : "Cancel Booking"}}
        </button>
        <button 
          v-if="checkUserType === 'receiver'"
          class="primary-button"
          @click="updateBooking('Negotiating', booking._id)">
          Accept
        </button>
      </div>
    </header>
    <header v-if="booking.status === 'Negotiating'">
      <div v-if='booking[checkUserType + "Status"] === "Negotiating"'>
        <h1>
          You are negotiating with 
          {{ checkUserType === 'receiver' ?
            booking.offerorName :
            booking.receiverName
          }} for a show at 
          {{readableDate(booking.show.showDate)}}
        </h1>
        <div class="button-container">
          <button class="alt-button" @click="deleteBooking(booking._id)">
            Cancel Booking
          </button>
          <button @click="finalizeBooking('Review')" class="primary-button">
            Accept Show Setup
          </button>
        </div>
      </div>
      <h1 v-else>Awaiting confirmation</h1>
    </header>
    <header v-if="booking.status === 'Review'">
      <h1>
        {{booking[checkUserType + "Status"] === "Review" ? 
        "Review Show" : "Awaiting Confirmation"
        }}
      </h1>
      <div class="button-container" v-if='booking[checkUserType + "Status"] === "Review"'>
        <button class="alt-button" @click="finalizeBooking('Negotiating')">
          Make a Change
        </button>
        <button @click="finalizeBooking('Confirmed')" class="primary-button">
          Confirm Show
        </button>
      </div>
    </header>
    <section class="booking-page-conversation">
      <div 
        class="booking-page-details" 
        :class="booking.status !== 'Negotiating' ? 'disable-interactions' : null">
        <div class="submit-booking-changes">
          <button 
            @click="submitShowChanges" 
            class="primary-button">
            Submit Changes
          </button>
        </div>
        <General></General>
        <Schedule></Schedule>
        <Other :userType='booking[checkUserType + "Type"]'></Other>
      </div>
      <div class="booking-page-messages">
        <Messages 
          :array="booking.messageArray"
          :offerorId="booking.offerorId"
          :receiverId="booking.receiverId">
        </Messages>
      </div>
      <div class="contract" v-if='booking.status === "Review"'>
        <h1>
          Confirm Booking on {{readableDate(booking.bookingDate)}}
          for {{title.actTitle}}
          to perform at {{title.venueTitle}}
        </h1>
        <h4>
          Warning! This is a legally binding contract 
          canceling within 48 hours of the show date or not 
          notifying the opposing party of cancellation will result in deposit
          being forfeited.
        </h4>
        <p>Add terms and conditions</p>
      </div>
    </section>
    <SendMessage :bookingId='booking._id'/>
  </div>
</template>

<script>
import Menu from '@/components/shared/Menu.vue'
import Error from '@/components/shared/Error.vue'
import General from "@/components/bookings/General.vue"
import Schedule from "@/components/bookings/Schedule.vue"
import Other from "@/components/bookings/Other.vue"
import Messages from "@/components/bookings/Messages.vue"
import SendMessage from "@/components/bookings/SendMessage.vue"

import getDataFn from "@/helper/getDataFn"
import formatDate from '@/helper/formatDate'

export default {
  components:{
    Menu,
    General,
    Schedule,
    Other,
    Messages,
    Error, 
    SendMessage
  },
  async created() {
    this.$store.commit("clearError")

    const loggedIn = await this.$store.dispatch('checkLogin')
    if (!loggedIn) {
      this.$router.push({
        name: 'admin',
        query: {
          type: 'login',
          redirect: this.$route.fullPath
        }
      })
    }

    const bookingId = this.$route.params.id
    const response = await getDataFn("/booking/" + bookingId)

    if (response.error) {
      this.$store.commit("upateError", response)
    }
    this.$store.commit("loadBooking", response)

    const io = this.$store.state.namespaces.booking
    
    io.emit('joinRoom', {
        roomId: response.booking._id.toString()
      }
    )

    io.on('updateMessage', message => {
      this.$store.commit('loadBookingMessage', message)
    })

    io.on('updateBooking', data => {
      console.log('updatingBooking')
      this.$store.commit('loadBooking', data)
    })
  },
  async updated () {
    const list = document.querySelector('.booking-page-messages')
    list.scroll({
      top: list.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })

    const booking = this.$store.state.booking
    if (booking.status === 'Confirmed' && this.checkUserType === 'offeror') {
      const payload = {
        bookingId: booking._id,
        showId: booking.show._id
      }

      const createPayment = await this.$store.dispatch('createBookingPayment', payload)

      if (!createPayment) {
        return this.$store.commit('updateError', 'There was a problem creating the payment for your booking')
      }

      this.$router.push({
        name: 'checkout', 
        params: {
          type: 'booking',
          id: booking._id
        },
      })

      this.$store.commit('clearBookingState')
    } else if (booking.status === 'Confirmed') {
      this.$router.push({
        name: 'admin-show', 
        params: {id: booking.show._id},
      })

      this.$store.commit('clearBookingState')
    }
  },
  beforeDestroy () {
    const io = this.$store.state.namespaces.booking
    
    io.emit('leaveRoom', {
        roomId: this.booking._id.toString()
      }
    )
  },
  methods: {
    deleteBooking(id) {
      this.$store.dispatch("deleteBooking", {
        path: this.$route.fullPath,
        bookingId: id
      })
    },
    readableDate(date) {
      return formatDate(date, false)
    },
    updateBooking(status, id) {
      this.$store.dispatch("updateBooking", {
        bookingId: id,
        status: status, 
        path: this.$route.fullPath
      })
    },
    submitShowChanges() {
      this.$store.dispatch('updateShowSetup', {
        bookingId: this.booking._id,
        redirect: this.$route.fullPath
      })
    },
    finalizeBooking(status) {
      this.$store.dispatch('finalizeBooking', {
        bookingId: this.booking._id,
        status
      })
    }
  },
  computed: {
    booking() {
      const booking = this.$store.state.booking
      return booking
    },
    title () {
      const titleObj = {}

      if (this.booking.offerorType === 'Act') {
        titleObj.actTitle = this.booking.offerorTitle
        titleObj.venueTitle = this.booking.receiverTitle
      } else {
        titleObj.venueTitle = this.booking.offerorTitle
        titleObj.actTitle = this.booking.receiverTitle
      }

      return titleObj
    },
    checkUserType() {
      const id = this.$store.state.baseUser.userId
      
      if (id === this.booking.receiverId) {
        return "receiver"
      }

      return "offeror"
    },
  }
}
</script>

<style lang="scss" scoped>
  .booking-page {
    height: 100%;

    .disable-interactions {
      pointer-events: none;
      opacity: 0.4;
    }

    header {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      height: 10vh;
      padding: 0 var(--spacing);
      border-bottom: var(--light-border);
      color: var(--primary);

      h1 {
        margin: var(--spacing) 0;
      }

      .button-container {
        margin-left: auto;
    
        button:last-child {
          margin-left: var(--spacing);
        }
      }
    }
  }

  .booking-page-conversation{
    font-size: 1.6rem;
    display: grid;
    grid-template-columns: 1.4fr 2fr;
    height: 70vh;
    position: relative
  }

  .booking-page-details {
    height: 100%;
    overflow-y: auto;
    border-right: var(--light-border);
    position: relative
  }

  .submit-booking-changes {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding: var(--spacing);
    background-color: white;
  }

  .booking-page-messages {
    height: 100%;
    overflow-y: auto;
  }

  .contract {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: var(--spacing) 15rem;
    background-color: white;

    h1 {
      margin-bottom: var(--alt-spacing);
    }
  }
</style>

