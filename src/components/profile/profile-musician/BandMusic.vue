<template lang="html">
  <section class="music">
    <div class="title-edit-container">
      <h3 class="paragraph-heading">Music</h3>
      <svg 
        @click="showEdit = !showEdit"
        v-if="editable">
        <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
      </svg>
    </div>
    <iframe scrolling="no"
      frameborder="no"
      allow="autoplay"
      :src="'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + trackId + '&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'">
    </iframe>
    <input 
      v-if="showEdit"
      type="text"
      class="edit-input"
      placeholder="Paste new track id here"
      v-model="soundcloudLink"
      name="soundcloudLink"
      v-on:change="editProfile($event, userType)"
    >
  </section>
</template>

<script>
  import editMixin from "@/mixins/editMixin"

  export default {
    mixins: [editMixin],
    props: ["editable", "trackId", "userType"],
    data() {
      return {
        soundcloudLink: "",
        showEdit: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .music{
    padding: var(--spacing);
    border-bottom: var(--light-border);
    iframe{
      width: 100%;
    }

    input {
      height: 4rem;
      width: 50%;
      margin-top: var(--spacing);
    }
  }
</style>
