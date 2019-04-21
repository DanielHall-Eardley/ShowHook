<template lang="html">
  <div class="edit-profile">
    <div class="edit-header">
      <EditProgress></EditProgress>
      <AppName></AppName>
    </div>
    <InputDetails
      v-bind:currentPage="currentPage"
      v-bind:currentStep="getStep">
    </InputDetails>
    <EditFooter v-bind:currentStep="getStep"
      v-bind:currentPage="currentPage"
      v-on:switchPage='switchPage($event)'>
    </EditFooter>
  </div>
</template>

<script>
import AppName from "@/components/AppName.vue"
import EditProgress from "@/components/EditProgress.vue"
import EditFooter from "@/components/EditFooter.vue"
import InputDetails from "@/components/InputDetails.vue"

export default {
  data(){
    return{
      currentPage: 0,
    }
  },
  components:{
    AppName,
    EditProgress,
    EditFooter,
    InputDetails,
  },
  computed:{
    getStep(){
    let type = this.$store.state.userConfig.user.userType
    let steps = this.$store.state.appConfig.steps[type]
    let i = 0
    while(steps[i].completed){
      i++
    }
    return i
    }
  },
  methods:{
    switchPage(num){
      this.currentPage = num
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-profile{
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .edit-header{
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
</style>
