<template lang="html">
  <div class="progress-bar">
    <div v-for="(step, i) in getSteps">
      <h2>{{step.stepDesc}}</h2>
      <div class="img-container">
      <img
        v-bind:src="step.completed ?
        'https:via.placeholder.com/20/green' :
        'https:via.placeholder.com/20/FF0000' " alt="progress-icon">
      <div
        v-if="i !== getSteps.length - 1"
        class="incomplete"
        v-bind:class="{complete: step.completed}">
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      type: this.$store.state.userConfig.user.userType
    }
  },
  computed:{
    getSteps(){
      return this.$store.state.appConfig.steps[this.type]
    },
  }
}
</script>

<style lang="scss" scoped>
  .progress-bar{
    padding: var(--alt-spacing);
    display: flex;
    div{
      flex: 1;
    }
    h2{
      margin: 4px 0px;
    }
  }

  .incomplete{
    height: 2px;
    background: var(--primary);
    width: 100%;
  }

  .complete{
    @extend .incomplete;
    background: var(--secondary-one);
  }

  .img-container{
    display: flex;
    align-items: center;
  }
</style>
