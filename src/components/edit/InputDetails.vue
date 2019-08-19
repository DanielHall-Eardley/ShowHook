<template lang="html">
  <div class="input-details">
    <h1>{{getComponent.stepName}}</h1>
    <keep-alive>
      <div>{{getComponent.page}}</div>
      <component :is="getComponent.page"></component>
    </keep-alive>
  </div>
</template>

<script>
import GenreComp from '@/components/edit/GenreComp.vue'
import RulesComp from '@/components/edit/RulesComp.vue'
import LocalLawsTaxes from '@/components/edit/LocalLawsTaxes.vue'
import ExampleMatches from '@/components/edit/ExampleMatches.vue'
import EditAddress from '@/components/edit/EditAddress.vue'

export default {
  components:{
    GenreComp,
    RulesComp,
    LocalLawsTaxes,
    ExampleMatches,
    EditAddress
  },
  computed:{
    getComponent(){
      let obj = this.$store.state.appConfig
      let userType = this.$store.state.userConfig.user.userType
      return {
        page: obj.profileCreation[userType][obj.profileCreationStep].pages[obj.profileCreationPage],
        stepName: obj.profileCreation[userType][obj.profileCreationStep].stepName
      }
    }
  },
}
</script>

<style lang="scss">
  .input-details{
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    padding: var(--spacing);

    h1, div{
      font-size: 3rem;
    }
  }
</style>
