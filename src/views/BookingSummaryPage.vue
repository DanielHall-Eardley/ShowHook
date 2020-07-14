 <template lang="html">
  <section class="booking-summary">
    <Menu></Menu>
    <Error/>
    <div class="booking-summary-container">
      <header>
        <h3>Received</h3>
      </header>
      <BookingSummary 
        v-for="summary in bookings.received"
        :summary="summary"
        :key="summary._id"
        type="offeror">
      </BookingSummary>
    </div>
    <div class="booking-summary-container">
      <header>
        <h3>Offered</h3>
      </header>
      <BookingSummary 
        v-for="summary in bookings.offered"
        :summary="summary"
        :key="summary._id"
        type="receiver">
      </BookingSummary>
    </div>
  </section>
</template>

<script>
  import Menu from "@/components/shared/Menu.vue"
  import Error from "@/components/shared/Error.vue"
  import BookingSummary from "@/components/bookings/BookingSummary"

  import getAdminDataFn from "@/helper/getAdminDataFn"

  export default {
    async created() {
      this.$store.commit('clearErrors')
      
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
        
      const id = this.$route.params.id

      const token = this.$store.state.token
      const response = await getAdminDataFn("/booking/summary/" + id, token)
      
      if (response.error) {
        return this.$store.commit('updateErrors')
      }
    
      this.$store.commit("loadBookingSummary", {
        data: response,
      })
    },
    data(){
      return{
        receivedFilter: "All",
        offeredFilter: "All",
      }
    },
    components:{
      Menu,
      BookingSummary,
      Error
    },
    computed:{
      bookings(){
        const bookings = this.$store.state.bookingSummary
        console.log(bookings)
        const received = bookings.received.filter(booking => {
          return booking.status.toLowerCase() !== 'confirmed'
        })

        const offered = bookings.offered.filter(booking => {
          return booking.status.toLowerCase() !== 'confirmed'
        })

        return {
          offered,
          received
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

  .booking-summary {
    height: 90vh;
    font-size: 1.6rem;
  }

  .booking-summary-container {
      height: 50%;
      overflow-y: scroll;
      position: relative;

      header {
        display: flex;
        padding: var(--alt-spacing) var(--spacing);
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        background-color: var(--light-grey);

        h3 {
          margin-right: var(--spacing);
        }

        &:last-child {
          border-top: var(--light-border);
        }
      }
    }
</style>

