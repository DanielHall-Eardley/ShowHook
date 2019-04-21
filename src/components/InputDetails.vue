<template lang="html">
  <div class="input-details">
    <div>
      <h2>{{getPage.title}}</h2>
      <keep-alive>
        <component v-bind:is="dynComp"
          v-bind:page="getPage">
        </component>
      </keep-alive>
    </div>
    <div>
      <img src="https://via.placeholder.com/50" alt="information icon">
      <p>{{getPage.information}}</p>
    </div>
  </div>
</template>

<script>
import InputComp from "@/components/InputComp.vue"

export default {
  components:{
    InputComp,
  },
  data(){
    return{
      type: this.$store.state.userConfig.user.userType,
      dynComp: 'InputComp'
    }
  },
  props:{
    currentStep: Number,
    currentPage: Number
  },
  computed:{
    getPage(){
      return this.$store.state.appConfig.steps[this.type][this.currentStep].pages[this.currentPage]
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-details{
    flex: 1;
    margin: var(--spacing);
    padding: var(--spacing);
    background: var(--primary);
    display: grid;
    grid-template-columns: 2fr 1fr;
    div{
      padding: var(--spacing);
      background: var(--alt-primary);
      border-radius: var(--border-radius);
    }
    div:last-of-type{
      margin-left: var(--spacing)
    }
  }
</style>
