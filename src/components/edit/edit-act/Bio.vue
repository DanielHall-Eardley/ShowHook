<template>
  <section class="edit-bio">
    <h3 class="section-heading">
      {{getComponent.name}}
    </h3>
    <input 
      type="text"
      class="default-input"
      v-model="title"
      placeholder="Enter your act's title"
    >
    <textarea 
      class="edit-textarea" 
      v-model="bio" 
      placeholder="Bio">
    </textarea>
  </section>
</template>

<script>
  export default {
    computed: {
      getComponent() {
        return this.$store.getters.getComponent
      }
    },
    data() {
      return {
        bio: "",
        title:""
      }
    },
    updated() {
      this.$store.commit("addActBio", {
        bio: this.bio,
        title: this.title
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .edit-bio {
    textarea {
      height: 20rem;
    }

    input {
      height: 4rem;
      margin-bottom: var(--spacing);
    }
  }
</style>