<template>
  <div id="band-venue-profile">
    <Menu v-bind:menuLinks="getMenu"></Menu>
    <div id="divider-band-venue"></div>
    <div id="banner-profile" >
      <Banner v-bind:banner="getDetails.banner"></Banner>
    </div>
    <div id="header-wrapper">
      <Title v-bind:info="getDetails"></Title>
      <FeatureIcons v-bind:features="getDetails.featureIcons">
      </FeatureIcons>
    </div>
    <AboutUser v-bind:about="getDetails"></AboutUser>
    <slot name="slot-one"></slot>
    <slot name="slot-two"></slot>
    <slot name="slot-three"></slot>
    <slot name="slot-four"></slot>
    <slot name="slot-five"></slot>
    <Reviews
      slot="slot-two"
      v-bind:reviews="getDetails.reviews"
      v-bind:averageRatings="getDetails.ratingsAveraged">
    </Reviews>
    <AboutUser v-bind:about="getDetails">
      <ProfileSummary></ProfileSummary>
    </AboutUser>
    <BookShow
    v-if="true"
    v-bind:price="getDetails.price"
    v-bind:type="getDetails.userType"
    v-bind:shows="getDetails.shows.upcoming"
    v-bind:id="getDetails.id">
    </BookShow>
  </div>
</template>

<script>
  import Menu from './Menu.vue'
  import Banner from '@/components/Banner.vue'
  import AboutUser from './AboutUser.vue'
  import Title from './Title.vue'
  import FeatureIcons from './FeatureIcons.vue'
  import BookShow from './BookShow.vue'
  import Reviews from './Reviews.vue'
  import ProfileSummary from './ProfileSummary.vue'

  export default{
    components:{
      Menu,
      Banner,
      AboutUser,
      Title,
      FeatureIcons,
      BookShow,
      ProfileSummary,
      Reviews
    },
    props:{
      getDetails: Object,
    },
    computed:{
      getMenu(){
        return this.$store.state.appConfig.navMenu
      }
    }
  }
</script>

<style lang="scss">
 #band-venue-profile{
   height:100%;
 }

 #banner-profile{
   height: 55vh;
   width: 100%;
 }

 #divider-band-venue{
   background: linear-gradient(to left, var(--gradient-one));
   height: var(--divider-height)
 }

#header-wrapper{
  margin: var(--spacing);
  border-bottom: solid 0.5px var(--primary);
}
</style>
