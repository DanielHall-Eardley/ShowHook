<template lang="html">
  <section class="progress-bar">
    <div class="progress-bar-step">
      <h3>{{progress.array[0].stepName}}</h3>
      <div class="progress-bar-step-box">
        <svg class="progress-bar-step-tick" v-if="progress.step > 0">
          <use xlink:href="@/assets/sprite.svg#icon-check"></use>
        </svg>
        <svg class="progress-bar-step-cross" v-else>
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
        <span class="progress-bar-step-line" :class="{pink: progress.step > 0}">
        </span>
      </div>
    </div>

    <div class="progress-bar-step">
      <h3>{{progress.array[1].stepName}}</h3>
      <div class="progress-bar-step-box">
        <svg class="progress-bar-step-tick" v-if="progress.step > 1">
          <use xlink:href="@/assets/sprite.svg#icon-check"></use>
        </svg>
        <svg class="progress-bar-step-cross" v-else>
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
        <span class="progress-bar-step-line" :class="{pink: progress.step > 1}">
        </span>
      </div>
    </div>

    <div class="progress-bar-step">
      <h3>{{progress.array[2].stepName}}</h3>
      <div class="progress-bar-step-box">
        <svg class="progress-bar-step-tick"
          v-if="progress.step === progress.stepsLength && progress.page === progress.pagesLength">
          <use xlink:href="@/assets/sprite.svg#icon-check"></use>
        </svg>
        <svg class="progress-bar-step-cross" v-else>
          <use xlink:href="@/assets/sprite.svg#icon-cross"></use>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed:{
    progress(){
      let obj = this.$store.state.appConfig
      let userType = this.$store.state.userConfig.user.userType

      return {
        stepName: obj.profileCreation[userType][obj.profileCreationStep].stepName,
        array: obj.profileCreation[userType],
        step: obj.profileCreationStep,
        page: obj.profileCreationPage,
        stepsLength: obj.profileCreation[userType].length -1,
        pagesLength: obj.profileCreation[userType][obj.profileCreationStep].pages.length - 1
      }
    },
  }
}
</script>

<style lang="scss">

.progress-bar{
  display: flex;
  align-items: center;
  padding: 0 var(--spacing);
  border-bottom: var(--light-border);

  &-step{
    flex: 1;

    &-box{
      display: flex;
      align-items: center;
    }

    h3{
      font-size: 1.7rem;
    }

    svg{
      width: 2.5rem;
      height: 2.5rem;

    }

    &-cross{
      fill: var(--alt-primary);
    }

    &-tick{
      fill: var(--primary);
    }

    &-line{
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
