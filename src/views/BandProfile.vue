<template lang="html">
  <div class="band-profile">
    <ProfileTemplate v-bind:getDetails="getDetails">
      <Video slot="slot-one"
        v-bind:videoData="getDetails.video">
      </Video>
      <Shows slot="slot-two"
        v-bind:shows="getDetails.shows">
      </Shows>
      <BandNews slot="slot-three"
        v-bind:news="getDetails.featuredNews">
      </BandNews>
      <BandMusic slot="slot-four"
        v-bind:featuredTrack="getDetails.featuredTrack">
      </BandMusic>
      <BandPictures slot="slot-five"
        v-bind:pictures="getDetails.pictures">
      </BandPictures>
    </ProfileTemplate>
  </div>
</template>

<script>
import ProfileTemplate from "@/components/ProfileTemplate.vue"
import Shows from "@/components/Shows.vue"
import Video from "@/components/Video.vue"
import BandNews from "@/components/BandNews.vue"
import BandPictures from "@/components/BandPictures.vue"
import BandMusic from "@/components/BandMusic.vue"

export default {
  components:{
    ProfileTemplate,
    Shows,
    Video,
    BandNews,
    BandPictures,
    BandMusic
  },
  computed:{
    getDetails(){
      return this.$store.state.userConfig.user
    }
  }
}
</script>

<style lang="scss" scoped>
  .video-container{
    margin: var(--spacing);
    padding: var(--spacing);
    background: var(--alt-primary)
  }
</style>
