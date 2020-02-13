<template>
  <button 
    class="alt-button"
    :class="{active: active}"
    @click="addRemoveGenre($event)">
    {{genre}}
  </button>
</template>

<script>
  export default {
    props: ["genre"],
    data() {
      return {
        active: false
      }
    },
    methods: {
      addRemoveGenre(event) {
        this.active = !this.active

        if (this.active) {
          return this.$store.commit("addGenre", {
            data: event.target.innerText,
          })
        }

        this.$store.commit("removeGenre", {
          data: event.target.innerText,
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '@/globalStyles/mixins.scss';

  .genre-button {
    font-size: 2rem;
  }

  .active {
    border: solid var(--primary) 2px !important;
  }
</style>