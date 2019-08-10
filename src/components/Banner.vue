<template>
  <div v-bind:class="!toggleEdit ? 'banner' : 'banner banner-highlight'"
    v-bind:style="{backgroundImage: backgroundImage}">
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
      this.backgroundImage = `url(${this.show.banner})`
    }else{
      this.backgroundImage = `url(${this.banner})`
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
    background-size: cover;
    background-position: center;
    position: relative;

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
