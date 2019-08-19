<template>
  <section class="landing-search">
    <h1 class="landing-search-title">
      <div class="landing-search-title-top">showhook</div>
      <div class="landing-search-title-bottom">
        Book unique venues and experience a show like never before.
      </div>
    </h1>
    <div class="landing-search-input">
      <input placeholder="Try 'Ottawa'" v-model="searchQuery">
      <svg>
        <use xlink:href="@/assets/sprite.svg#icon-magnifying-glass"></use>
      </svg>
      <router-link v-bind:to="'/home/:'+ searchQuery">Search</router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ""
    };
  }
};
</script>

<style lang="scss">
@import "@/globalStyles/mixins.scss";

.landing-search{
  height: 90vh;
  padding: 0 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &-title{
    font-size: 3rem;

    &-top{
      color: var(--primary);
      margin-bottom: var(--alt-spacing);
    }

    &-bottom{
      color: var(--alt-primary);
      margin-bottom: var(--spacing);
    }
  }

  &-input{
    display: grid;
    width: 100%;
    height: 5rem;

    svg{
      height: 3.5rem;
      width: 3.5rem;
      fill: var(--alt-primary);
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      z-index: 1;
      align-self: center;
      margin-left: var(--alt-spacing);
      transition: all .3s;
    }

    input{
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      text-indent: 5rem;
      outline: none;
      border-radius: var(--border-radius);
      border: solid 2px var(--light-grey);
      transition: all .3s;

      &:active, &:focus{
        border: solid 2px var(--secondary-six);
        text-indent: 1rem;
      }

      &::placeholder, &-webkit-placeholder{
        font-size: 1.6rem;
      }
    }

    input:active ~ svg, input:focus ~ svg{
      opacity: 0;
    }

    a{
      &:visited, &:link{
        text-decoration: none;
        color: white;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        justify-self: end;
        align-self: center;
        margin-right: var(--alt-spacing);
        @include button;
      }
    }
  }
}
</style>
