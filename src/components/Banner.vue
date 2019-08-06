<template>
  <div v-bind:class="!toggleEdit ? 'banner' : 'banner banner-highlight'">
    <img v-bind:src="backgroundImage" alt="banner" class='banner-img'>
    <slot></slot>
    <button v-if='toggleEdit'>Upload a photo</button>
    <AddressAge v-if='show' :show='show' :toggleEdit='toggleEdit'></AddressAge>
  </div>
</template>

<script>
import AddressAge from './shows/AddressAge.vue'

export default {
  components:{
    AddressAge,
  },
  props: {
    show: Object,
    toggleEdit: Boolean,
    banner: String
  },
  data(){
    return{
      backgroundImage: undefined
    }
  },
  mounted(){
    if(this.show){
      this.backgroundImage = this.show.banner
    }else{
      this.backgroundImage = this.banner
    }
  }
};
</script>

<style lang="scss" scoped>
  .banner{
    width: 100%;
    min-height: 30vh;
    height: 100%;
    box-sizing: border-box;

    button{
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .banner-highlight{
    border: dashed 1px var(--primary);
  }

  .banner-img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: block;
    z-index: -1;
    position: relative;
  }
</style>
