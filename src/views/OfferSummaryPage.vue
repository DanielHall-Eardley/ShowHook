 <template lang="html">
  <section class="offer-summary">
    <Menu></Menu>
    <div class="offer-summary-select-box">
      <select class="offer-summary-select" v-model="selected">
        <option value="All"  class="offer-summary-select-option">
          All messages
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
    </div>
    <OfferSummary 
      v-for="summary in summaryArray"
      :summary="summary">
    </OfferSummary>
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
      const responseData = await getAdminDataFn("admin/offer-summary/" + id, token)
      
      if (responseData.messages) {
        return this.error = responseData.messages
      }

      this.$store.commit("loadOfferData", {
        data: responseData.offers,
      })
    },
    data(){
      return{
        selected: "All"
      }
    },
    components:{
      Menu,
      OfferSummary
    },
    computed:{
      summaryArray(){
        const array = this.$store.state.userConfig.offerSummary

        if(this.selected.toLowerCase() === "all"){
          return array
        }

        const filteredArray = array.filter(el => {
          if(el.status.toLowerCase() === this.selected.toLowerCase()){
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

