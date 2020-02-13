<template lang="html">
  <div class="edit-footer">
    <button class="alt-button" v-on:click="switchPage('dec')">
      Back
    </button>
    <p v-if="profileError">{{profileError}}</p>
    <button 
      class="primary-button" 
      v-on:click="switchPage('inc')">
      Next
    </button>
  </div>
</template>

<script>
export default {
  methods:{
    switchPage(direction){
      this.$store.dispatch("changeStepOrPage", direction)
    }
  },
  computed: {
    profileError() {
      return this.$store.getters.getComponent.error
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
  justify-content: space-between;
  padding: 0 var(--spacing);

  svg{
    height: 3rem;
    width: 3rem;
    fill: var(--secondary-six);
  }

  p {
    font-size: 1.8rem;
    color: white;
    justify-self: center;
    background-color: red;
    padding: var(--alt-spacing) var(--spacing);
    border-radius: var(--border-radius);
  }
}
</style>
