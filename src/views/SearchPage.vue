<template lang="html">
  <div class="search-container">
    <SearchHeader></SearchHeader>
    <Filters></Filters>
    <div class="flex-container">
    <Card></Card>
    <SearchMap v-if='mapObject'></SearchMap>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/search/Filters.vue'
import SearchMap from '@/components/search/SearchMap.vue'
import Card from '@/components/search/Card.vue'
import SearchHeader from '@/components/search/SearchHeader.vue'

export default {
  components:{
    Filters,
    SearchMap,
    SearchHeader,
    Card
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
    }
  },
  computed:{
    mapObject(){
      return this.$store.state.appConfig.mapObject
    }
  }
}
</script>

<style lang="css" scoped>
  .search-container{
    padding: var(--spacing);
    height: 100%;
    box-sizing: border-box;
  }
  .flex-container{
    display: flex;
    height: 80%;
    width: 100%;
  }
</style>
