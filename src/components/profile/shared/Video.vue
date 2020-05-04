<template>
  <section class="video">
    <div class="title-edit-container">
      <h3 class="paragraph-heading">Video</h3>
      <svg 
        @click="showEdit = !showEdit"
        v-if="editable">
        <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
      </svg>
    </div>
    <div class="video-container">
      <iframe
        v-bind:src="'https://www.youtube.com/embed/' + videoId"
        v-bind:allowFullScreen="true"
        frameBorder="0">
      </iframe>
    </div>
    <input 
      v-if="showEdit"
      type="text"
      class="default-input"
      placeholder="Paste new video id here"
      v-model="youtubeLink"
      name="youtubeLink"
      v-on:change="editProfile($event, userType)"
    >
  </section>
</template>

<script>
  import editMixin from "@/mixins/editMixin"

  export default{
    mixins: [editMixin],
    props: ["editable", "videoId", "userType"],
    data() {
      return {
        youtubeLink: "",
        showEdit: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .video {
    padding: var(--spacing);
    border-bottom: var(--light-border);

    &-container {
      height: 50vh;
      iframe{
        height: 100%;
        width: 100%;
      }
    }

    input {
      height: 4rem;
      width: 50%;
      margin-top: var(--spacing);
    }
  }
</style>
