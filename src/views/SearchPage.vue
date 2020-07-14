<template lang="html">
  <div class="search-container">
    <Menu></Menu>
    <Error/>
    <Filters :userType="userType" :page="page"></Filters>
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
import checkLoginMixin from '@/mixins/checkLoginMixin'

export default {
  mixins: [checkLoginMixin],
  async created () {
    this.checkLogin()
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
      let array = this.$store.state.filterMenu
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
      return this.$store.state.baseUser.userType
    },
    error() {
      return this.$store.state.error
    },
    results() {
      return this.$store.state.searchResults
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";
  .search-container{
    height: 100%;
    position: relative;

    .page-controls {
      display: flex;
      justify-content: space-between;
      padding: 0 var(--spacing);
      height: 10vh;
      align-items: center;
      border-top: var(--light-border);
    }
  }
</style>
