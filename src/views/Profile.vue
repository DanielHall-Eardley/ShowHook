<template>
  <div id="profile">
    <Menu v-bind:menuPos="menuPos"></Menu>

    <ProfilePic v-bind:profilePic="user.pic"
    v-bind:picturePos="picturePos"></ProfilePic>

    <About v-bind:about="user"
    v-bind:aboutPos="aboutPos"></About>

    <VerifiedInfo v-bind:infoPos="infoPos"
    v-bind:contactInfo="getVerifiedInfo"></VerifiedInfo>

    <Shows v-bind:shows="user.shows"
    v-bind:showPos="showPos"></Shows>

    <Reviews v-bind:reviews="user.reviews"
    v-bind:reviewPos="reviewPos"></Reviews>
  </div>
</template>

<script>
import About from "@/components/profile/shared/About";
import Menu from "@/components/shared/Menu";
import ProfilePic from "@/components/profile/shared/ProfilePic";
import Reviews from "@/components/profile/shared/Reviews";
import Shows from "@/components/profile/shared/Shows";
import VerifiedInfo from "@/components/profile/shared/VerifiedInfo";

export default {
  components: {
    About,
    Menu,
    ProfilePic,
    Reviews,
    Shows,
    VerifiedInfo
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
