<template>
  <section class="links">
    <h3 class="section-heading">
      Add content
    </h3>
    <input 
      type="text"
      class="edit-input"
      placeholder="Paste Youtube video id here"
      name="youtube"
      v-on:input="addLinks($event)"
    >
    <input 
      type="text"
      class="edit-input"
      placeholder="Paste Soundcloud track id here"
      name="soundcloud"
      v-on:input="addLinks($event)"
    >
    <input 
      type="text"
      class="edit-input"
      placeholder="Paste Blog url here"
      name="blog"
      v-on:input="addLinks($event)"
    >
  </section>
</template>

<script>
  export default {
    methods: {
      addLinks(e) {
        this.$store.commit("addLinks", {
          name: e.target.name,
          value: e.target.value
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .links input {
    margin-bottom: var(--spacing);
    height: 4rem;
  }
</style>