<template>
  <div id="profile">
    <Menu></Menu>
    <ProfilePic v-bind:profilePic="user.pic"></ProfilePic>
  </div>
</template>

<script>
import Menu from "@/components/shared/Menu";
import ProfilePic from "@/components/profile/shared/ProfilePic";

export default {
  components: {
    Menu,
    ProfilePic,
  },
  data() {
    return {
    };
  },
  computed: {
    user() {
      console.log(this.$store.state.baseUser)
      return this.$store.state.baseUser;
    },
  }
};
</script>

<style lang="scss">
  
</style>
