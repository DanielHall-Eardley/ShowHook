<template>
  <div id="profile-pic" v-bind:style="picturePos">
    <div>
      <img v-bind:src="profilePic">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profilePic: String,
    picturePos: Object
  }
};
</script>

<style lang="scss">
#profile-pic {
  margin: var(--spacing);
  div {
    height: 100%;
    width: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
