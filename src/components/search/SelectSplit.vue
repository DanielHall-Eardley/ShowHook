<template lang="html">
  <div class="split-container">
    <div>
      <h3><b>Split</b></h3>
      <div  class='toggle-button'>
        <span v-on:click='toggleSplit($event)' class='slider'></span>
      </div>
    </div>
      <p>
        Book gigs where you can split the
        ticket sales after costs.
      </p>
    <div>
      <button v-on:click='submitSplit("cancel", "Split (%)")'>Cancel</button>
      <button v-on:click='submitSplit("save")'>SAVE</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      split: false
    }
  },
  methods:{
    toggleSplit(e){
      this.split = !this.split
      let bool = this.split
      let slider = e.target
      let step;
      if(this.split){
        step = 0
      }else{
        step = 30
      }
      function animate(){
        if(step < 30 && bool){
          step = step + 3
          slider.style.background = 'var(--primary)'
          slider.style.transform = `translateX(${step}px)`
          requestAnimationFrame(animate)
        }else if(step > 0 && !bool){
          step = step - 3
          slider.style.background = 'var(--alt-primary)'
          slider.style.transform = `translateX(${step}px)`
          requestAnimationFrame(animate)
        }
      }
      animate()

    },
    submitSplit(str, name){
      console.log(str)
      let bool
      if(str === 'cancel'){
        bool === undefined
        this.$emit('cancelSelection', name)
      }else {
        bool = this.split
      }
      this.$store.commit('addToSearchQuery', {
        split: bool
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/globalStyles/mixins.scss';

  .toggle-button{
    display: inline-block;
    width: 60px;
    height: 30px;
    border: solid 1px var(--secondary-six);
    border-radius: 15px;
  }

  .slider{
    height: 95%;
    width: 30px;
    background: var(--alt-primary);
    border-radius: 15px;
  }

  .split-container{
    @include drop-down(250px);
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h3{
      margin: 0px;
    }

    button{
      @include cancel-button()
    }

    button:last-child{
      color: var(--primary);
    }
  }
</style>
