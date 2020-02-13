<template>
  <div class="app-name">
   <h2>
     <router-link :to="'/'">shh.</router-link>
     <router-link :to="'/'">showhook</router-link>
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

      a:first-of-type{
        color: var(--primary);
        text-decoration: none;
      }

      a:last-of-type{
        color: var(--alt-primary);
        text-decoration: none;
      }
    }
  }
</style>
