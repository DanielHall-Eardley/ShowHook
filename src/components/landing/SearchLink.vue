<template>
  <section class="landing-search">
    <h1 class="landing-search-title">
      <div class="landing-search-title-top">showhook</div>
      <div class="landing-search-title-bottom">
        Book unique venues and experience a show like never before.
      </div>
    </h1>
    <div class="landing-search-input">
      <input placeholder="Try 'Ottawa'" v-model="searchQuery"/>
      <button class='primary-button' @click='navigateToSearch()'>Search</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    navigateToSearch() {
      const payload = {
        key: 'keyword',
        value: this.searchQuery
      }

      this.$store.commit('addSingleFilter', payload)
      this.$router.push({name: 'search'})
    }
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
    display: flex;
    width: 100%;
    height: 5rem;

    input{
      flex: 1;
      text-indent: var(--alt-spacing);
      outline: none;
      border-radius: var(--border-radius);
      border: solid 2px var(--light-grey);
      transition: all .3s;
      margin-right: var(--spacing);
      font-size: 2rem;

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
        ;
      }
    }
  }
}
</style>
