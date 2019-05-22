<template lang="html">
  <div class="edit-footer">
    <img src="https://via.placeholder.com/30" alt="Back icon">
    <button id="back"
      v-show='showBack()'
      v-on:click="switchPage($event)">
      Back
    </button>
    <button>
      {{!getSteps[getSteps.length - 1].completed ?
      "Save & Exit" : "Finish"}}
    </button>
    <button id="next"
      v-show="currentStep < getSteps.length"
      v-on:click="switchPage($event)">
      Next
    </button>
    <img src="https://via.placeholder.com/30" alt="Next ">
  </div>
</template>

<script>
export default {
  data(){
    return{
      type: this.$store.state.userConfig.user.userType
    }
  },
  props:{
    currentStep: Number,
    currentPage: Number
  },
  computed:{
    getSteps(){
      return this.$store.state.appConfig.steps[this.type]
    },
  },
  methods:{
    switchPage(e){
      let newPage = this.currentPage
      let pagesCount = this.getSteps[this.currentStep].pages.length
      let stepsCount = this.getSteps.length

        if(pagesCount === this.currentStep && stepsCount === this.currentStep){
          console.log('finished')
          return
        }

        if(e.target.id === "next"){
          newPage++
        }else if(e.target.id === "back"){
          newPage--
        }

        if(newPage === pagesCount){
          this.$store.dispatch("changeStep",
          {
            type: this.type,
            step: this.currentStep,
            change: 'inc'
          })
          this.$emit('switchPage', 0)
          console.log('inc')
          return
        }

        if(newPage < 0 && this.currentStep > 0){
          this.$store.dispatch('changeStep',
          {
            type: this.type,
            step: this.currentStep,
            change: 'dec'
          })
          pagesCount = this.getSteps[this.currentStep - 1].pages.length
          this.$emit('switchPage', pagesCount - 1)
          console.log('dec')
          return
        }
      this.$emit('switchPage', newPage)
    },
    showBack(){
      if(this.currentStep === 0 && this.currentPage < 1){
        return false
      }else{
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/globalStyles/mixins.scss';

  .edit-footer{
    display: grid;
    grid-template-columns: 0.4fr 1fr 5fr 1fr 0.4fr;
    padding: var(--alt-spacing);
    margin-top: var(--alt-spacing);
    border-top: solid 1px var(--alt-primary);
    img{
      justify-self: right;
      grid-column: 1/2;
      align-self: center;
    }
    img:last-of-type{
      justify-self: left;
      grid-column: 5/6;
    }
  }

  button{
    @include button();
    width: 20%;
    justify-self: center;
    grid-column: 3/4;
}

  #back{
    justify-self: left;
    width: 50%;
    grid-column: 2/3;
  }

  #next{
    justify-self: right;
    width: 50%;
    grid-column: 4/5;
  }
</style>
