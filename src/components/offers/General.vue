<template lang="html">
  <section class="general">
    <h2 class="subheading">
      <span>General</span>
      <svg v-if="!showSection" @click="showSection = !showSection">
        <use xlink:href="@/assets/sprite.svg#icon-triangle-down"></use>
      </svg>
      <svg v-else @click="showSection = !showSection">
        <use xlink:href="@/assets/sprite.svg#icon-triangle-up"></use>
      </svg>
    </h2>
    <div class="expand-container" v-show="showSection">
      <input 
        type="text" 
        class="default-input"
        placeholder="Add a title for the show">
      <textarea 
        placeholder="Add a description for the show"
        class="default-input">
      </textarea>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      showSection: false,
    }
  },
  props: ["show"],
  methods:{
    updateOffer(e){
      this.$store.commit("updateOffer", e.target)
    },
  }
}
</script>

<style lang="scss">
@import '../../globalStyles/helper.scss';

.subheading{
  color: var(--primary);
  font-weight: 100;
  display: flex;

  svg{
    height: 3.5rem;
    width: 3.5rem;
    fill: var(--primary);
    margin-left: auto;
  }
}

.general{
  padding: var(--spacing);
  border-bottom: var(--light-border);
}

.expand-container {
  display: grid;
  grid-row-gap: var(--alt-spacing);
}
</style>
