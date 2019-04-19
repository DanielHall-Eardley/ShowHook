<template lang="html">
  <div class="edit-footer">
    <img src="https://via.placeholder.com/30" alt="Back icon">
    <button id="back"
      v-show="getSteps[0].completed"
      v-on:click="switchPage($event)">
      Back
    </button>
    <button>
      {{!getSteps[getSteps.length - 1].completed ?
      "Save & Exit" : "Finish"}}
    </button>
    <button id="next"
      v-show="!getSteps[getSteps.length - 1].completed"
      v-on:click="switchPage($event)">
      Next
    </button>
    <img src="https://via.placeholder.com/30" alt="Next ">
  </div>
</template>

<script>
export default {
  props:{
    currentStep: Number,
  },
  computed:{
    getSteps(){
      let type = this.$store.state.userConfig.user.userType
      return this.$store.state.appConfig.steps[type]
    },
  },
  methods:{
    switchPage(e){
      let step = this.getSteps[this.currentStep].pages
      let getPage = this.$route.params
      let newParam = parseInt(getPage.pageNumber)
      if(newParam !== step[step.length] - 1){
        if(e.target.id === "next"){
          newParam++
        }else if(e.target.id === "back"){
          newParam--
        }
        this.$router.push({path: `/edit/${getPage.id}/page/${newParam}`})
      }else{
        console.log("f")
        this.$store.dispatch("incrementStep")
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
