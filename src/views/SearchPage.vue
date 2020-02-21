<template lang="html">
  <div class="search-container">
    <Menu></Menu>
    <Filters :userType="userType" :page="page"></Filters>
    <Error errorType="error"></Error>
    <List :array="results"></List>
    <div class="page-controls" v-if="results.length > 0">
      <button class="primary-button" @click="decPage">
        Back
      </button>
      <button class="primary-button" @click="incPage">
        Next
      </button>
    </div>
   </div>
</template>

<script>
import Filters from '@/components/search/filters/Filters.vue'
import List from '@/components/search/List.vue'
import Menu from '@/components/shared/Menu.vue'
import Error from '@/components/shared/Error.vue'

export default {
  async created () {
    const token = localStorage.getItem("token") 
    if (token) {
      await this.$store.dispatch("autoLogin", this.$route.fullPath)
    }
  },
  components:{
    Filters,
    Map,
    List,
    Menu,
    Error
  },
  data() {
    return { 
      page: 0
    }
  },
  methods:{
    //figure out how to make this function work
    //needs close menu if clicked outside menu
    checkForOpenMenu(){
      let array = this.$store.state.appConfig.filterMenu
      let newArray = array.map(el => {
        if(el.active){
          el.active = false
          return el
        }else{
          return el
        }
      })
      this.$store.commit('updateFilterMenu', newArray)
    },
    incPage() {
      if (this.page < this.results.length) {
        this.page++
      }
    },
    decPage() {
      if (this.page > 0) {
        this.page--
      }
    },
  },
  computed:{
    userType() {
      return this.$store.state.userConfig.baseUser.userType
    },
    error() {
      return this.$store.state.userConfig.error
    },
    results() {
      return this.$store.state.appConfig.searchResults
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";
  .search-container{

    .page-controls {
      bottom: 0;
      position: sticky;
      display: flex;
      justify-content: space-between;
      padding: 0 var(--spacing);
    }
  }
</style>
