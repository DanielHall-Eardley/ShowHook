 <template lang="html">
  <section class="offer-summary">
    <Menu></Menu>
    <div class="offer-summary-received">
      <header>
        <h3>Received</h3>
        <select class="offer-summary-select" v-model="receivedFilter">
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
    <div class="offer-summary-offered">
      <header>
        <h3>Offered</h3>
        <select class="offer-summary-select" v-model="offeredFilter">
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
    methods:{
      highlight(val){
        let color;
        switch(val){
          case "Accepted":
          color = 'green'
          break

          case "Pending":
          color = 'yellow'
          break

          case "Rejected":
          color = 'grey'
          break

          case "Expired":
          color = 'red'
          break
        }

        return{
          color: color
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .offer-summary{

    &-select-box{
      display: flex;
      justify-content: flex-end;
      padding-left: var(--spacing);
      padding-right: var(--spacing);
      padding-top: var(--spacing);
    }

    &-select{
      height: 3.5rem;
      width: 20rem;
      font-size: 1.6rem;
      outline: none;
    }

    &-select-option{
      margin: var(--alt-spacing) 0;
    }

    &-list{
      padding: var(--spacing);
      display: grid;
      grid-row-gap: var(--spacing);
    }

    &-list-item{
      display: grid;
      grid-template-columns: min-content max-content 1fr min-content;
      grid-template-rows: min-content min-content;
      grid-row-gap: 1rem;
      grid-column-gap: var(--spacing);
      border-bottom: var(--light-border);
      padding-bottom: var(--spacing);
      img{
        height: 5rem;
        border-radius: 50%;
        object-fit: cover;
        display: block;
        grid-row: 1 / -1
      }

      &-name, &-timestamp{
        font-size: 1.8rem;
        font-weight: 400;
      }

      &-message, &-address{
        font-size: 1.6rem;
        color: var(--alt-primary);
      }

      &-offer{
        justify-self: center;
        font-size: 1.8rem;
        font-weight: 400;
      }

      &-price{
        justify-self: center;
        font-size: 1.8rem;
        font-weight: 400;
      }
    }
  }
</style>

