 <template lang="html">
  <section class="offer-summary">
    <Menu></Menu>
    <div class="offer-summary-container">
      <header>
        <h3>Received</h3>
        <select class="default-input select" v-model="receivedFilter">
          <option value="All"  class="offer-summary-select-option">
            All 
          </option>
          <option value="Pending" class="offer-summary-select-option">
            Pending
          </option>
          <option value="Accepted" class="offer-summary-select-option">
            Accepted
          </option>
          <option value="Expired" class="offer-summary-select-option">
            Expired
          </option>
          <option value="Rejected" class="offer-summary-select-option">
            Rejected
          </option>
        </select>
      </header>
      <OfferSummary 
        v-for="summary in receivedArray"
        :summary="summary"
        :key="summary._id"
        type="offeror">
      </OfferSummary>
    </div>
    <div class="offer-summary-container">
      <header>
        <h3>Offered</h3>
        <select class="default-input select" v-model="offeredFilter">
          <option value="All"  class="offer-summary-select-option">
            All 
          </option>
          <option value="Pending" class="offer-summary-select-option">
            Pending
          </option>
          <option value="Accepted" class="offer-summary-select-option">
            Accepted
          </option>
          <option value="Expired" class="offer-summary-select-option">
            Expired
          </option>
          <option value="Rejected" class="offer-summary-select-option">
            Rejected
          </option>
        </select>
      </header>
      <OfferSummary 
        v-for="summary in offeredArray"
        :summary="summary"
        :key="summary._id"
        type="receiver">
      </OfferSummary>
    </div>
  </section>
</template>

<script>
  import Menu from "@/components/shared/Menu.vue"
  import OfferSummary from "@/components/offers/OfferSummary"

  import getAdminDataFn from "@/helper/getAdminDataFn"

  export default {
    async created() {
      await this.$store.dispatch("autoLogin", this.$route.fullPath)
      const id = this.$route.params.id

      const token = this.$store.state.userConfig.token
      const responseData = await getAdminDataFn("offers-summary/" + id, token)
      
      if (responseData.messages) {
        return this.receivedError = responseData.messages
      }

      this.$store.commit("loadOfferSummary", {
        data: responseData.offers,
      })
    },
    data(){
      return{
        receivedFilter: "All",
        offeredFilter: "All",
        receivedError: null,
        offeredError: null
      }
    },
    components:{
      Menu,
      OfferSummary
    },
    computed:{
      receivedArray(){
        const array = this.$store.state.userConfig.offerSummary.received
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
      offeredArray(){
        const array = this.$store.state.userConfig.offerSummary.offered
        console.log(array)
        if (this.offeredFilter.toLowerCase() === "all") {
          return array
        }

        const filteredArray = array.filter(el => {
          if(el.status.toLowerCase() === this.offeredFilter.toLowerCase()){
            return el
          }
        })

        return filteredArray
      }
    },
  }
</script>

<style lang="scss" scoped>

  .offer-summary {
    height: 90vh;
    font-size: 1.6rem;

    
  }

  .offer-summary-container {
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

