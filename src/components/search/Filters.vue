<template lang="html">
  <div class="search-filter-container">
    <div class="types-container">
      <span v-for='type in typesArray'
        v-bind:class='{highlight: type.active}'
        v-on:click='toggleType(type.name)'>
        {{type.name}}
      </span>
    </div>
    <div class="filters-container">
      <div class='menu-container' v-for='(menu, i) in getFilterMenu'>
        <span :class='{highlight: menu.active}'
          v-on:click='toggleFilters(menu.name)'>
          {{getTitle(menu, i)}}
        </span>
          <component v-bind:is='menu.module'
            v-show='menu.active'
            v-bind:array='toggleArray()'
            v-on:cancelSelection='toggleFilters($event)'>
          </component>
        <img src="menu.img" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import SelectType from '@/components/search/SelectType.vue'
import SelectPriceRange from '@/components/search/SelectPriceRange.vue'
import SelectSplit from '@/components/search/SelectSplit.vue'
import SelectMoreFilters from '@/components/search/SelectMoreFilters.vue'

export default {
  components:{
    SelectType,
    SelectPriceRange,
    SelectSplit,
    SelectMoreFilters
  },
  data(){
    return{
      typesArray:[
        {name: 'ALL', active: true},
        {name: 'VENUES', active: false},
        {name: 'MUSICIANS', active: false},
      ],
      artistArray: [
        {
          title: 'Solo',
          label: 'Have a unique singer songwriter over',
          url: require('@/assets/Musician-Icon-Shh/solo.png'),
          name: 'artist'
        },
        {
          title: 'Duo',
          label: 'Have a charismatic combination',
          url: require('@/assets/Musician-Icon-Shh/duo.png'),
          name: 'artist'
        },
        {
          title: 'Band',
          label: 'Have the whole crew over',
          name: 'artist',
          url: require('@/assets/Musician-Icon-Shh/band.png')
        },
        {
          title: 'DJ',
          label: 'have a mash up party',
          name: 'artist',
          url: require('@/assets/Musician-Icon-Shh/dj.png')
        },
      ],
      venueArray:[
        {
          title: 'Bar',
          label: 'Have some drinks and listen to tunes',
          url: require('@/assets/Venue-Icon-Shh/business.png'),
          name: 'venue',
        },
        {
          title: 'Shared Space',
          label: 'Share the experience with others',
          url: require('@/assets/Venue-Icon-Shh/public.png'),
          name: 'venue',
        },
        {
          title: 'Private Space',
          label: 'Share the experience with friends and family',
          url: require('@/assets/Venue-Icon-Shh/private.png'),
          name: 'venue',
        },
      ]
    }
  },
  methods:{
    toggleType(name){
      let payload = {}
      for(let type of this.typesArray){
        if(type.name === name){
          type.active = true
          payload.type = name
        }else{
          type.active = false
        }
      }
      this.$store.commit('addToSearchQuery', payload)
      this.toggleArray()
    },
    toggleFilters(name){
      let array = this.$store.state.appConfig.filterMenu
      let newArray = array.map(el => {
        if(el.name === name){
          if(el.active){
            el.active = false
          }else{
            el.active = true
          }
          return el
        }else{
          el.active = false
          return el
        }
      })
      this.$store.commit('updateFilterMenu', newArray)
    },
    toggleArray(){
      let type = this.getFilters.type
      if(!type || type === 'ALL'){
        return [...this.venueArray, ...this.artistArray]
      }else if(type === "MUSICIANS"){
        return  this.artistArray
      }else{
        return this.venueArray
      }
    },
    getTitle(menu, i){
      if(i) return menu.name

      if(!i && this.getFilters.type === 'VENUES'){
        return `Filter By ${menu.altName}`
      }else if(!i && this.getFilters.type === 'MUSICIANS'){
        return `Filter By ${menu.name}`
      }else if(!i && this.getFilters.type === 'ALL' || !this.getFilters.type){
        return `Filter By ${menu.name} & ${menu.altName}`
      }
    }
  },
  computed:{
    getFilters(){
      return this.$store.state.appConfig.searchQuery
    },
    getFilterMenu(){
      return this.$store.state.appConfig.filterMenu
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-filter-container{
    padding: var(--spacing) 0px;
    span{
      cursor: pointer;
      margin-right: var(--spacing);
    }
  }

  .highlight{
    border-bottom: solid 2px var(--primary);
  }

  .filters-container{
    display: flex;
    padding-top: var(--spacing);
    span{
      margin-right: var(--spacing);
    }
  }
  .menu-container{
    position: relative;
  }
</style>
