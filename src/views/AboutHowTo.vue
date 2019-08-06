<template lang="html">
  <div class="information-container">
    <header>
      <AppName></AppName>
      <div class='link-container'>
        <router-link :to="{ name: 'landing', params: {action: 'login'} }">
          Log in
        </router-link>
        <router-link :to="{ name: 'landing', params: {action: 'signUp'} }">
          Sign up
        </router-link>
      </div>
    </header>
    <div class='banner-container'>
      <Banner banner='https://via.placeholder.com/1000'>
        <h1 class='heading-container'>
          <span class='heading-main'>Looking For More Gigs?</span>
          <span class='heading-sub'>Get started for free!</span>
          <button type="button" name="button">Sign Up</button>
        </h1>
      </Banner>
    </div>
    <p>
      We provide a suite of tools and resources that connect you with venues and
      musicians and great a ticketing solution.
    </p>
    <div class="u-spacing">
      <FeatureIcons :features='featureIconArray'></FeatureIcons>
    </div>
    <Information></Information>
    <GetStarted></GetStarted>
  </div>
</template>

<script>
import AppName from '../components/AppName.vue'
import Banner from '../components/Banner.vue'
import FeatureIcons from '../components/profile/FeatureIcons.vue'
import Information from '../components/about-how-to/Information.vue'
import GetStarted from '../components/about-how-to/GetStarted.vue'


export default {
  components:{
    AppName,
    Banner,
    FeatureIcons,
    Information,
    GetStarted
  },
  data(){
    return{
      featureIconArray:[
        {
          src: 'https://via.placeholder.com/60',
          text: 'SEARCH'
        },
        {
          src: 'https://via.placeholder.com/60',
          text: 'MESSAGE'
        },
        {
          src: 'https://via.placeholder.com/60',
          text: 'TICKETING'
        },
        {
          src: 'https://via.placeholder.com/60',
          text: 'EPK'
        },
        {
          src: 'https://via.placeholder.com/60',
          text: 'OPPERTUNITY'
        },
      ]
    }
  },
}
</script>

<style lang="scss">
@import '@/globalStyles/mixins.scss';
@import '@/globalStyles/variables.scss';

  .information-container{
    header{
      padding: var(--spacing);
      display: flex;
      justify-content: space-between;
    }

    .router-link-active{
      margin-left: var(--spacing);
    }

    .heading-main, .heading-sub{
      display: block;
    }

    .heading-main{
      font-size: $main-heading;
      letter-spacing: .2rem;
    }

    .heading-sub{
      font-size: $sub-heading;
      letter-spacing: .1rem;
    }

    .banner-container{
      height: 60vh;
      position: relative;
    }

    .heading-container{
      position: absolute;
      left: 50%;
      bottom: 20%;
      transform: translateX(-50%);
      text-align: center;
      button{
        @include button;
        margin-top: var(--spacing);
      }
    }

    p:first-of-type{
      font-size: 1.2rem;
      text-align: center;
      margin-bottom: 0px;
    }

    .u-spacing{
      padding: var(--spacing);
    }
  }
</style>
