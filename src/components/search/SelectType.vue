[o]<template lang="html">
  <div class="type-container">
    <div v-for='radio in array' :key='radio.title'>
      <input type="radio"
        v-bind:name='radio.name'
        v-bind:value='radio.title'
        v-on:input='updateInput($event)'>
      <div class='title'>
        <span><b>{{radio.title}}</b></span>
        <span>{{radio.label}}</span>
      </div>
      <img :src="radio.url" alt="icon">
    </div>
    <div class='button-container'>
      <button v-on:click='cancelSelection("Artist")'>Cancel</button>
      <button v-on:click='submitType()'>SAVE</button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    array: Array,
  },
  data(){
    return{
      venueType: null,
      artistType: null
    }
  },
  methods:{
    cancelSelection(name){
      this.$store.commit('addToSearchQuery', {
        artistType: undefined,
        venueType: undefined
      })
      this.$emit('cancelSelection', name)
    },
    submitType(){
      let payload = {}
      if(this.artistType){
        payload.artistType = this.artistType
      }
      if(this.venueType){
        payload.venueType = this.venueType
      }
      this.$store.commit('addToSearchQuery', payload)
    },
    updateInput(e){
      if(e.target.name === 'artist'){
        this.artistType = e.target.value
      }else{
        this.venueType = e.target.value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/globalStyles/mixins.scss';

  .type-container{
    @include drop-down(350px);
    div{
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      justify-content: center;
      margin-right: var(--alt-spacing);
    }
    .title{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }
    input{
      margin-right: var(--alt-spacing);
    }
    img{
      width: 10%;
    }
    button{
      @include cancel-button()
    }
    button:last-of-type{
      color: var(--primary)
    }
    .button-container{
      display: flex;
      justify-content: space-between;
    }
  }
</style>
