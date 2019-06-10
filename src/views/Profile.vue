<template>
  <div id="profile">
    <Menu v-bind:menuLinks="getMenuLinks"
    v-bind:menuPos="menuPos"></Menu>

    <div id="divider-user"></div>

    <ProfilePic v-bind:profilePic="getUserInfo.pic"
    v-bind:picturePos="picturePos"></ProfilePic>

    <AboutUser v-bind:about="getUserInfo"
    v-bind:aboutPos="aboutPos"></AboutUser>

    <VerifiedInfo v-bind:infoPos="infoPos"
    v-bind:contactInfo="getVerifiedInfo"></VerifiedInfo>

    <Shows v-bind:shows="getUserInfo.shows"
    v-bind:showPos="showPos"></Shows>

    <Reviews v-bind:reviews="getUserInfo.reviews"
    v-bind:reviewPos="reviewPos"></Reviews>
  </div>
</template>

<script>
import AboutUser from "@/components/profile/AboutUser";
import Menu from "@/components/profile/Menu";
import ProfilePic from "@/components/profile/ProfilePic";
import Reviews from "@/components/profile/Reviews";
import Shows from "@/components/profile/Shows";
import VerifiedInfo from "@/components/profile/VerifiedInfo";

export default {
  components: {
    AboutUser,
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
        gridRow: "3/4",
        gridColumn: "1/2"
      },
      aboutPos:{
        gridRow: "3/4",
        gridColumn: "2/5"
      },
      showPos:{
        gridRow: "4/5",
        gridColumn: "2/5"
      },
      reviewPos:{
        gridRow: "5/6",
        gridColumn: "2/5"
      },
      infoPos:{
        gridRow: "4/5",
        gridColumn: "1/2"
      }
    };
  },
  computed: {
    getMenuLinks() {
      return this.$store.state.appConfig.navMenu;
    },
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
  grid-template-rows: 12vh var(--divider-height) 30vh minmax(30vh, auto) minmax(30vh, auto);
  z-index: 0;
}
#divider-user {
  grid-row: 2/3;
  grid-column: 1/5;
  background: linear-gradient(to left, var(--gradient-one));
}
</style>
