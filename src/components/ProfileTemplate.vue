<template>
  <div id="band-venue-profile">
    <Menu></Menu>
    <div id="divider-band-venue"></div>
    <div id="banner-profile" >
      <Banner v-bind:banner="getDetails.banner"></Banner>
    </div>
    <div id="header-wrapper">
      <Title v-bind:info="getDetails"></Title>
      <FeatureIcons v-bind:features="getDetails.featureIcons"
      v-bind:featurePos="featurePos">
      </FeatureIcons>
      <BookShow v-bind:bookPos="bookPos"
      v-bind:price="getDetails.price"
      v-bind:type="getDetails.userType"
      v-bind:shows="getDetails.shows.upcoming"
      v-bind:id="getDetails.id">
      </BookShow>
    </div>
    <AboutUser v-bind:about="getDetails"></AboutUser>
    <slot name="slot-one"></slot>
    <Reviews v-bind:reviews="getDetails.reviews"
      v-bind:averageRatings="getDetails.ratingsAveraged">
    </Reviews>
    <AboutUser v-bind:about="getDetails">
      <ProfileSummary></ProfileSummary>
    </AboutUser>
  </div>
</template>

<script>
  import Menu from '@/components/Menu.vue'
  import Banner from '@/components/Banner.vue'
  import Reviews from '@/components/Reviews.vue'
  import AboutUser from '@/components/AboutUser.vue'
  import Title from '@/components/Title.vue'
  import FeatureIcons from '@/components/FeatureIcons.vue'
  import BookShow from '@/components/BookShow.vue'
  import ProfileSummary from '@/components/ProfileSummary.vue'

  export default{
    components:{
      Menu,
      Banner,
      Reviews,
      AboutUser,
      Title,
      FeatureIcons,
      BookShow,
      ProfileSummary,
    },
    props:{
      getDetails: Object,
    },
    data(){
      return{
        featurePos:{
          gridColumn: "1/2",
          gridRow: "2/3"
        },
        bookPos:{
          gridColumn: "2/3",
          gridRow: "1/3"
        },
      }
    }
  }
</script>

<style lang="scss">
 #band-venue-profile{
   height:100%;
 }

 #banner-profile{
   height: 60vh;
   width: 100%;
 }

 #divider-band-venue{
   background: linear-gradient(to left, var(--gradient-one));
   height: var(--divider-height)
 }

 #header-wrapper{
   display: grid;
   grid-template-columns: 65% 35%;
   height: auto;
 }
</style>
