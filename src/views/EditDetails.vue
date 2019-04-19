<template lang="html">
  <div class="edit-profile">
    <div class="edit-header">
      <EditProgress></EditProgress>
      <AppName></AppName>
    </div>
    <router-view></router-view>
    <EditFooter v-bind:currentStep="currentStep"></EditFooter>
  </div>
</template>

<script>
import AppName from "@/components/AppName.vue"
import EditProgress from "@/components/EditProgress.vue"
import EditFooter from "@/components/EditFooter.vue"

export default {
  data(){
    return{
      currentStep: 0
    }
  },
  components:{
    AppName,
    EditProgress,
    EditFooter,
  },
  beforeMount(){
    let type = this.$store.state.userConfig.user.userType
    let steps = this.$store.state.appConfig.steps[type]
    let i = 0
    while(steps[i].completed){
      i++
    }
    this.currentStep = i
  },
}
</script>

<style lang="scss" scoped>
  .edit-profile{

  }

  .edit-header{
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
</style>
