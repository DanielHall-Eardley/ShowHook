<template lang="html">
  <div class="edit-profile">
    <nav class="edit-profile-header">
      <AppName></AppName>
      <button @click="cancel" class="alt-button">
        Cancel
      </button>
    </nav>
    <Error/>
    <section class="edit-profile-box">
      <EditProgress></EditProgress>
      <InputDetails></InputDetails>
      <InputInfo></InputInfo>
      <EditFooter></EditFooter>
    </section>
  </div>
</template>

<script>
import AppName from "@/components/shared/AppName.vue"
import EditProgress from "@/components/edit/page-template/EditProgress.vue"
import EditFooter from "@/components/edit/page-template/EditFooter.vue"
import InputDetails from "@/components/edit/page-template/InputDetails.vue"
import InputInfo from "@/components/edit/page-template/InputInfo.vue"
import Error  from "@/components/shared/Error"
import checkLoginMixin from '@/mixins/checkLoginMixin'

export default {
  mixins: [checkLoginMixin],
  async created(){
    await this.checkLogin()
  },
  components:{
    AppName,
    EditProgress,
    EditFooter,
    InputDetails,
    InputInfo,
    Error
  },
  methods:{
    cancel(){
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
@import "@/globalStyles/helper.scss";

.edit-profile{
  overflow: hidden;
  
  &-header{
    height: 10vh;
    display: flex;
    align-items: center;
    padding: 0 var(--spacing);
    border-bottom: solid 1px var(--light-grey);

    button{
      margin-left: auto;
    }
  }

  &-box{
    display: grid;
    grid-template-rows: 15vh 65vh 10vh;
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
