<template lang="html">
  <div class="edit-profile">
    <nav class="edit-profile-header">
      <AppName></AppName>
      <button @click="saveAndExit">
        Save and Exit
      </button>
    </nav>
    <section class="edit-profile-box">
      <EditProgress></EditProgress>
      <InputDetails></InputDetails>
      <InputInfo></InputInfo>
      <EditFooter></EditFooter>
    </section>
  </div>
</template>

<script>
import AppName from "@/components/AppName.vue"
import EditProgress from "@/components/edit/EditProgress.vue"
import EditFooter from "@/components/edit/EditFooter.vue"
import InputDetails from "@/components/edit/InputDetails.vue"
import InputInfo from "@/components/edit/InputInfo.vue"

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
    InputInfo
  },
  computed:{
    getStep(){
    let type = this.$store.state.userConfig.user.userType
    let steps = this.$store.state.appConfig.steps[type]
    let i = 0
    while(steps[i].completed){
      i++
    }
      if(i === steps.length -1){
        //return some action
      }
      return i
    }
  },
  methods:{
    switchPage(num){
      this.currentPage = num
    },
    saveAndExit(){
      this.$router.push('/')
      //submit details to server
    }
  }
}
</script>

<style lang="scss">
@import "@/globalStyles/mixins.scss";

.edit-profile{

  &-header{
    height: 10vh;
    display: flex;
    align-items: center;
    padding: 0 var(--spacing);
    border-bottom: solid 1px var(--light-grey);

    button{
      @include alt-button;
      margin-left: auto;
    }
  }

  &-box{
    display: grid;
    grid-template-rows: 10vh 70vh 10vh;
    grid-template-columns: 2fr 1fr;
  }
}
</style>

/*Notes from Jozef

*/

/*New create profile implementation
Three different sign up types
Each sign up type has an array with the steps in order
Each step has an array of ordered pages that must be completed before moving to next step
Only sign type array has been full iterated over is the process completed

Use the multiple pointers trick
need to be able inc and dec

create two pointers step and page
start both at 0
if page is greater inc step
if page is greater than page array length and step is also greater than its array return
if page is less than page array length inc page
*/
