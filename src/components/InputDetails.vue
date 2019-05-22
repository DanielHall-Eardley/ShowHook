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
    <div class="info">
      <div>
        <img src="https://via.placeholder.com/50" alt="information icon">
        <p v-html='formatText(getPage.information)'></p>
      </div>
    </div>
  </div>
</template>

<script>
import InputComp from "@/components/InputComp.vue"
import GenreComp from '@/components/GenreComp.vue'
import RulesComp from '@/components/RulesComp.vue'

export default {
  components:{
    InputComp,
    GenreComp,
    RulesComp
  },
  data(){
    return{
      type: this.$store.state.userConfig.user.userType,
    }
  },
  props:{
    currentStep: Number,
    currentPage: Number
  },
  computed:{
    getPage(){
      return this.$store.state.appConfig.steps[this.type][this.currentStep].pages[this.currentPage]
    },
    dynComp(){
      let type = this.getPage.inputType
      if(type === "genre"){
        return "GenreComp"
      }

      if(type === 'input'){
        return 'InputComp'
      }

      if(type === 'rules'){
        return 'RulesComp'
      }

    }
  },
  methods:{
    formatText(str){
      let formattedString = ''
      for(let l of str){
        if(l === '*'){
          formattedString += "<br/>"
        }else{
        formattedString += l
        }
      }
      return formattedString
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-details{
    flex: 1;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    div{
      padding: var(--spacing);
    }
  }
  .info{
    background: var(--secondary-six);
    padding: var(--spacing);
    div{
      background: white;
      padding: var(--spacing);
      border-radius: var(--border-radius);
    }
  }
</style>
