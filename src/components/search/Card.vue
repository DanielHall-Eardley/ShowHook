<template lang="html">
  <div class="card-container" :class='{mapActive: mapActive}'>
    <div class="card" v-for='userCard in resultsArray'>
      <div class='main-img-container'>
        <img id='main-img' :src="userCard.mainPic" alt="Main picture">
      </div>
      <div class='sub-img-container'>
        <div class='img-container'>
          <img id='sub-img' :src="userCard.subPic" alt="Profile picture">
          <span>{{userCard.name}}</span>
        </div>
        <span v-on:click='showMap(userCard.location)'>
          {{userCard.location}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    resultsArray(){
      return this.$store.state.appConfig.resultsArray
    },
    mapActive(){
      return this.$store.state.appConfig.mapObject.shown
    }
  },
  methods:{
    showMap(location){
      this.$store.commit('showMap', location)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    grid-row-gap: var(--spacing);
    grid-column-gap: var(--spacing);
    overflow-y: scroll;
    margin-right: var(--alt-spacing)
    span{
      margin-left: 5px;
    }
  }

  .mapActive{
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 30vh;;
    flex: 1
  }

  #sub-img, .img-container{
    height: 100%;
  }

  .img-container{
    display: flex;
    align-items: center;
  }

  .card{
    display: flex;
    flex-direction: column;

  }
  #main-img{
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    border: solid 0.2px var(--alt-primary);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .card-container::-webkit-scrollbar {
    display: none;
  }
  .main-img-container{
    height: 70%;
  }
  .sub-img-container{
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: solid 0.5px var(--alt-primary);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 5px;
    box-sizing: border-box;
  }

</style>
