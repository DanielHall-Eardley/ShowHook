<template>
  <div class="video">
    <h3>{{videoData.title}}</h3>
    <div>
      <iframe
        v-bind:src="'https://www.youtube.com/embed/' + videoData.videoId"
        v-bind:allowFullScreen="true"
        frameBorder="0">
      </iframe>
    </div>
  </div>
</template>

<script>
export default{
  props:{
    videoData: Object,
  }
}
</script>

<style lang="scss" scoped>
  .video{
    margin: var(--spacing);
    padding: var(--spacing);
    background: var(--alt-primary);
    border-radius: var(--border-radius);
    div{
      height: 50vh;
      iframe{
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
