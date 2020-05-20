 <template lang="html">
  <section class="booking-summary">
    <Menu></Menu>
    <Error/>
    <div class="booking-summary-container">
      <header>
        <h3>Received</h3>
        <select class="default-input select" v-model="receivedFilter">
          <option value="All"  class="booking-summary-select-option">
            All 
          </option>
          <option value="Pending" class="booking-summary-select-option">
            Pending
          </option>
          <option value="Accepted" class="booking-summary-select-option">
            Accepted
          </option>
          <option value="Expired" class="booking-summary-select-option">
            Expired
          </option>
          <option value="Rejected" class="booking-summary-select-option">
            Rejected
          </option>
        </select>
      </header>
      <BookingSummary 
        v-for="summary in receivedArray"
        :summary="summary"
        :key="summary._id"
        type="offeror">
      </BookingSummary>
    </div>
    <div class="booking-summary-container">
      <header>
        <h3>Offered</h3>
        <select class="default-input select" v-model="bookingedFilter">
          <option value="All"  class="booking-summary-select-option">
            All 
          </option>
          <option value="Pending" class="booking-summary-select-option">
            Pending
          </option>
          <option value="Accepted" class="booking-summary-select-option">
            Accepted
          </option>
          <option value="Expired" class="booking-summary-select-option">
            Expired
          </option>
          <option value="Rejected" class="booking-summary-select-option">
            Rejected
          </option>
        </select>
      </header>
      <BookingSummary 
        v-for="summary in bookingedArray"
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
      await this.$store.dispatch("autoLogin", this.$route.fullPath)
      const id = this.$route.params.id

      const token = this.$store.state.token
      const responseData = await getAdminDataFn("bookings-summary/" + id, token)
      
      if (responseData.messages) {
        return this.$store.commit('updateErrors')
      }

      this.$store.commit("loadBookingSummary", {
        data: responseData.bookings,
      })
    },
    data(){
      return{
        receivedFilter: "All",
        bookingedFilter: "All",
        receivedError: null,
        bookingedError: null
      }
    },
    components:{
      Menu,
      BookingSummary,
      Error
    },
    computed:{
      receivedArray(){
        const array = this.$store.state.bookingSummary.received
        console.log(array)
        if (this.receivedFilter.toLowerCase() === "all") {
          return array
        }

        const filteredArray = array.filter(el => {
          if(el.status.toLowerCase() === this.receivedFilter.toLowerCase()){
            return el
          }
        })

        return filteredArray
      },
      bookingedArray(){
        const array = this.$store.state.bookingSummary.bookinged
        console.log(array)
        if (this.bookingedFilter.toLowerCase() === "all") {
          return array
        }

        const filteredArray = array.filter(el => {
          if(el.status.toLowerCase() === this.bookingedFilter.toLowerCase()){
            return el
          }
        })

        return filteredArray
      }
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

        select {
          width: 30rem;
        }

        h3 {
          margin-right: var(--spacing);
        }

        &:last-child {
          border-top: var(--light-border);
        }
      }
    }
</style>

