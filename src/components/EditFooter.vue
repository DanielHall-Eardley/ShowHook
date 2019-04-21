<template lang="html">
  <div class="edit-footer">
    <img src="https://via.placeholder.com/30" alt="Back icon">
    <button id="back"
      v-show="currentPage > 0"
      v-on:click="switchPage($event)">
      Back
    </button>
    <button>
      {{!getSteps[getSteps.length - 1].completed ?
      "Save & Exit" : "Finish"}}
    </button>
    <button id="next"
      v-show="currentPage < getSteps[currentStep].pages.length"
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
      if(newPage <= this.getSteps[this.currentStep].pages.length - 1){
        if(e.target.id === "next"){
          newPage++
        }else if(e.target.id === "back"){
          newPage--
        }
        this.$emit('switchPage', newPage)
      }else{
        console.log("f")
        this.$emit('switchPage', 0)
        this.$store.dispatch("incrementStep", {type: this.type, step: this.currentStep})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-footer{
    display: grid;
    grid-template-columns: 0.4fr 1fr 5fr 1fr 0.4fr;
    img{
      justify-self: right;
      grid-column: 1/2;
    }
    img:last-of-type{
      justify-self: left;
      grid-column: 5/6;
    }
  }

  button{
    width: 20%;
    justify-self: center;
    grid-column: 3/4
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
