<template>
  <div id="profile">
    <Menu v-bind:menuPos="menuPos"></Menu>

    <ProfilePic v-bind:profilePic="getUserInfo.pic"
    v-bind:picturePos="picturePos"></ProfilePic>

    <About v-bind:about="getUserInfo"
    v-bind:aboutPos="aboutPos"></About>

    <VerifiedInfo v-bind:infoPos="infoPos"
    v-bind:contactInfo="getVerifiedInfo"></VerifiedInfo>

    <Shows v-bind:shows="getUserInfo.shows"
    v-bind:showPos="showPos"></Shows>

    <Reviews v-bind:reviews="getUserInfo.reviews"
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
      menuPos: {
        gridRow: "1/2",
        gridColumn: "1/5"
      },
      picturePos:{
        gridRow: "2/3",
        gridColumn: "1/2"
      },
      aboutPos:{
        gridRow: "2/3",
        gridColumn: "2/5"
      },
      showPos:{
        gridRow: "3/4",
        gridColumn: "2/5"
      },
      reviewPos:{
        gridRow: "4/5",
        gridColumn: "2/5"
      },
      infoPos:{
        gridRow: "3/4",
        gridColumn: "1/2"
      }
    };
  },
  computed: {
    getUserInfo() {
      return this.$store.state.userConfig.user;
    },
    getVerifiedInfo(){
      let {name, email, location, phone} = this.getUserInfo
      let verifiedArray = [name, email, location, phone]
      return verifiedArray
    }
  }
};
</script>

<style lang="scss">
#profile {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: min-content minmax(30vh, auto) minmax(30vh, auto);
  z-index: 0;
}
</style>
