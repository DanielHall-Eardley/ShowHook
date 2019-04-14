<template lang="html">
  <div class="music">
    <iframe scrolling="no"
      frameborder="no"
      allow="autoplay"
      v-bind:src="'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + featuredTrack + '&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'">
    </iframe>
  </div>
</template>

<script>
export default {
  props:{
    featuredTrack: String
  }
}
</script>

<style lang="scss" scoped>
  .music{
    margin: var(--spacing);
    padding: var(--spacing);
    background: var(--alt-primary);
    border-radius: var(--border-radius);
    iframe{
      width: 100%;
    }
  }
</style>
