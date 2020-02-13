<template lang="html">
  <section class="progress-bar">
    <div class="progress-bar-headings">
      <h3>{{getProfileCreationArray[0].stepName}}</h3>
      <h3>{{getProfileCreationArray[1].stepName}}</h3>
      <h3>{{getProfileCreationArray[2].stepName}}</h3>
    </div>
    <div class="progress-bar-steps">
      <div class="progress-bar-icon">
        <svg class="tick" v-if="getProgress.step > 0">
          <use xlink:href="@/assets/sprite.svg#icon-check"></use>
        </svg>
        <svg class="cross" v-else>
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </div>
      <span 
        class="line" 
        :class="{pink: getProgress.step > 0}">
      </span>
      <div class="progress-bar-icon">
        <svg class="tick" v-if="getProgress.step > 1">
          <use xlink:href="@/assets/sprite.svg#icon-check"></use>
        </svg>
        <svg class="cross" v-else>
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </div>
      <span 
        class="line" 
        :class="{pink: getProgress.step > 1}">
      </span>
      <div class="progress-bar-icon">
        <svg class="tick"
          v-if="getProgress.step === getProfileCreationArray.length - 1 && 
          getProgress.page === getProfileCreationArray[getProfileCreationArray.length - 1].pages.length - 1">
          <use xlink:href="@/assets/sprite.svg#icon-check"></use>
        </svg>
        <svg class="cross" v-else>
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed:{
    getProgress() {
      return this.$store.getters.getProfileCreationProgress
    },
    getProfileCreationArray() {
      return this.$store.getters.getProfileCreationArray
    }
  }
}
</script>

<style lang="scss">

.progress-bar{
  padding: var(--alt-spacing) var(--spacing);
  border-bottom: var(--light-border);

  &-headings {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 1.6rem;

    h3:nth-child(3) {
      justify-self: end;
    }

    h3:nth-child(2) {
      justify-self: center;
    }
  }

  &-steps{
    display: flex;
    align-items: center;

    svg{
      width: 2.5rem;
      height: 2.5rem;

    }

    .cross{
      fill: var(--alt-primary);
    }

    .tick{
      fill: var(--primary);
    }

    .line{
      height: 2px;
      background-color: var(--alt-primary);
      flex: 1;
    }

    .pink{
      background-color: var(--primary);
    }
  }
}
</style>
