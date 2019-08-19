<template lang="html">
  <div class="edit-footer">
    <svg>
      <use xlink:href="@/assets/sprite.svg#icon-chevron-thin-left"></use>
    </svg>
    <button class="edit-footer-back" v-on:click="switchPage('dec')">
      Back
    </button>
    <button class="edit-footer-next" v-on:click="switchPage('inc')">
      Next
    </button>
  </div>
</template>

<script>
export default {
  computed:{
    getComponent(){
      let obj = this.$store.state.appConfig
      let userType = this.$store.state.userConfig.user.userType
      return {
        page: obj.profileCreation[userType][obj.profileCreationStep].pages[obj.profileCreationPage],
        stepName: obj.profileCreation[userType][obj.profileCreationStep].stepName,
        userType,
      }
    }
  },
  methods:{
    switchPage(direction){
      this.$store.dispatch("changeStepOrPage", {
        direction,
        userType: this.getComponent.userType
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/globalStyles/mixins.scss';

.edit-footer{
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
  border-top: var(--light-border);
  display: flex;
  align-items: center;
  padding-right: var(--spacing);
  padding-left: var(--alt-spacing);
  svg{
    height: 3rem;
    width: 3rem;
    fill: var(--secondary-six);
  }

  &-next{
    @include button;
    margin-left: auto;
  }

  &-back{
    @include alt-button;
  }
}
</style>
