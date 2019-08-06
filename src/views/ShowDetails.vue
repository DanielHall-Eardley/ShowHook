<template lang="html">
  <div class="show-details">
    <Menu></Menu>
    <Banner :show='getShowDetails' :toggleEdit='toggle'></Banner>
    <div class="grid-container">
      <div>
        <ShowText :show='getShowDetails' :toggleEdit='toggle'></ShowText>
        <SearchMap :toggleEdit='toggle'></SearchMap>
      </div>
      <div>
        <CountDown :toggleEdit='toggle' :show='getShowDetails'></CountDown>
        <ShowSummary :show='getShowDetails' :toggleEdit='toggle'></ShowSummary>
        <div class='edit'>
          <img src="https://via.placeholder.com/80/red" alt="icon">
          <button v-on:click='toggleEdit()'>Edit Show Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import SearchMap from '@/components/SearchMap.vue'
import AddressAge from '@/components/shows/AddressAge.vue'
import ShowText from '@/components/shows/ShowText.vue'
import CountDown from '@/components/shows/CountDown.vue'
import ShowSummary from '@/components/shows/ShowSummary.vue'

export default {
  components:{
    Menu,
    Banner,
    SearchMap,
    AddressAge,
    ShowText,
    CountDown,
    ShowSummary
  },
  data(){
    return{
      toggle: false
    }
  },
  beforeMount(){
    let payload = {
      location: this.getShowDetails.venueAddress,
      name: this.getShowDetails.venueName,
      mainPic: this.getShowDetails.banner,
    }
    this.$store.commit('showMap', payload)
  },
  computed:{
    getShowDetails(){
      let shows = this.$store.state.userConfig.user.shows
      //let id = this.$route.params.showId
      for(let show of shows){
        if(show.id.toString() === '2'){
          return show
        }
      }
      this.$router.push('/page-not-found')
    }
  },
  methods:{
    toggleEdit(){
      this.toggle = !this.toggle
    }
  }
}
</script>

<style lang="scss" scoped>
  .show-details{
    .edit{
      display: flex;
      height: 2rem;
      img{
        height: 100%;
        object-fit: cover;
        margin-right: var(--spacing);
      }
    }
    .grid-container{
      padding: var(--spacing);
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-column-gap: var(--spacing);
    }
  }
</style>
