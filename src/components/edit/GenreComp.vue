<template lang="html">
  <div class="genre">
    <button v-for='(value, name) in page.options'
      v-bind:class='{clicked: value}'
      v-on:click='addGenre(name)'>
      {{name}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    page: Object
  },
  methods:{
    addGenre(name){
      this.page.options[name] = !this.page.options[name]
      this.$store.commit('updateGenre', name)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/globalStyles/mixins.scss';

  button{
    @include alt-button();
    margin-bottom: var(--alt-spacing);
    margin-right: var(--alt-spacing);
  }

  .clicked{
    border: solid 2px var(--primary);
  }
</style>
