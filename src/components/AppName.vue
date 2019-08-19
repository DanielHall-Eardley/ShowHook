<template>
  <div class="app-name">
   <h2>
     <span>shh.</span>
     <span>showhook</span>
   </h2>
  </div>
</template>

<style lang="scss" scoped>
@import '@/globalStyles/variables.scss';

  .app-name {

    h2{
      font-family: var(--heading-font);
      font-size: $main-heading;
      font-weight: 300;
      letter-spacing: .3rem;

      span:first-of-type{
        color: var(--primary);
      }

      span:last-of-type{
        color: var(--alt-primary);
      }
    }
  }
</style>
