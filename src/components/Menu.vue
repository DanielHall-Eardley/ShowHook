<template>
  <nav class="menu">
    <AppName></AppName>

    <div class="menu-loggedout-links" v-if="!loginState">
      <router-link :to="{ name: '', params: {} }">I am a Venue</router-link>
      <router-link :to="{ name: '', params: {} }">I am a Muscian</router-link>
      <router-link :to="{ name: '', params: {} }">Help</router-link>
      <router-link :to="{ name: 'login', params: {loginType: 'signUp'} }">
        Sign Up
      </router-link>
      <router-link :to="{ name: 'login', params: {loginType: 'login'} }">
        Log in
      </router-link>
    </div>

    <div class="menu-loggedin-links" v-else>
      <router-link :to="{ name: '', params: {} }">Add a Listing</router-link>
      <router-link :to="{ name: '', params: {} }">Shows</router-link>
      <router-link :to="{ name: '', params: {} }">Messages</router-link>
      <router-link :to="{ name: '', params: {} }">Help</router-link>
      <img src="https://via.placeholder.com/100" alt="Profile pic">
    </div>
  </nav>
</template>

<script>
import AppName from "@/components/AppName.vue";

export default {
  components: {
    AppName,
  },
  data(){
    return {

    }
  },
  methods: {

  },
  computed: {
    loginState(){
      return this.$store.state.appConfig.loginState
    }
  }
};
</script>

<style lang="scss">
@import '@/globalStyles/variables.scss';



.menu{
  display: flex;
  align-items: center;
  padding: 0 var(--spacing);
  height: 10vh;
  border-bottom: var(--light-border);

  &-loggedin-links, &-loggedout-links{
    margin-left: auto;
    display: flex;
    align-items: center;

    a{
      &:link, &:visited{
        font-size: 1.5rem;
        text-decoration: none;
        color: var(--alt-primary);
        transition: all .2s;
        cursor: pointer;
      }

      &:hover{
        color: var(--primary);
      }

      &:active{
        color: darken($primary, 15);
      }

      &:not(:last-child){
        margin-right: var(--spacing);
      }
    }
  }

  img{
    height: 7vh;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
}
</style>
