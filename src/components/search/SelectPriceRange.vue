<template lang="html">
  <div class="price-range-container">
    <div>
      <span>Min {{min}} CAD</span>
      <span>Max {{max}} CAD</span>
    </div>
    <div class='range'>
      <input name='min' type="range" min='0'
        max='550'
        step='1'
        v-on:input='updatePriceRange($event)'
        v-bind:value='min'>
      <input name='max' type="range" max='600'
        min='50'
        step='1'
        v-on:input='updatePriceRange($event)'
        v-bind:value='max'>
    </div>
    <div>
      <button v-on:click='cancelPriceRange("Price Range")'>Cancel</button>
      <button v-on:click='submitPriceRange()'>SAVE</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      min: 0,
      max: 600,
    }
  },
  methods:{
    updatePriceRange(e){
      if(e.target.name === 'min'){
        this.min = parseInt(e.target.value)
        if(this.max <= this.min){
          this.max = this.min + 50
        }
      }else{
        this.max = parseInt(e.target.value)
        if(this.min >= this.max){
          this.min = this.max - 50
        }
      }
    },
    submitPriceRange(name){
      this.$store.commit('addToSearchQuery', {
        priceRange:{min: this.min, max: this.max}
      })
    },
    cancelPriceRange(){
      this.$store.commit('addToSearchQuery', {
        priceRange: undefined
      })
      this.$emit('cancelSelection', name)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/globalStyles/mixins.scss';
  .price-range-container{
    @include drop-down(250px);
    div:first-child{
      display: flex;
      justify-content: space-between;
    }
    .range{
      padding: var(--alt-spacing);
    }
    div:last-child{
      display: flex;
      justify-content: space-between;
    }
    span{
      color: var(--secondary-six);
    }
    input::-ms-fill-lower{
      background: var(--primary)
    }

    input{
      -webkit-appearance: none;
      width: 100%;
      height: 5px;
      border-radius: 5px;
      background: #d3d3d3;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
    }
    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--primary);
      cursor: pointer;
    }
    input::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #4CAF50;
      cursor: pointer;
    }
  }
  button{
    @include cancel-button()
  }
  button:last-of-type{
    color: var(--primary)
  }
</style>
