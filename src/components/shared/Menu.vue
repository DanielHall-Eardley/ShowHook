<template>
  <nav class="menu">
    <AppName></AppName>
    <div class="menu-loggedout-links" v-if="!loginState">
      <router-link  
        class="default-link" 
        :to="{ name: 'admin', query: {type: 'signUp'} }">
        Sign Up
      </router-link>
      <router-link  
        class="default-link" 
        :to="{ name: 'admin', query: {type: 'login'} }">
        Log in
      </router-link>
    </div>
    <div class="menu-loggedin-links" v-else>
      <span class='default-link'>{{user.name}}</span>
      <!-- <router-link 
        class="default-link"
        :to="{name: 'profile', params: {id: user._id}}">
        {{user.name}}
      </router-link> -->
      <span
        class="default-link"
        @click="routeLink">
        {{user.userType}}
      </span>
      <router-link 
        class="default-link"
        :to="{ name: 'offer-summary', params: {id: user.userId}}">
        Offers
      </router-link>
      <router-link 
        class="default-link"
        :to="{ name: 'search'}">
        Search
      </router-link>
      <span class="default-link" @click="logout">
        Log out
      </span>
      <img 
        src="https://via.placeholder.com/100" 
        alt="Profile pic"
        @click="routeLink"
      >
    </div>
  </nav>
</template>

<script>
  import AppName from "./AppName.vue";

  export default {
    components: {
      AppName,
    },
    methods: {
      loadProfile() {   
        const type = this.user.userType.toLowerCase()
    
        this.$router.push({
          name: "admin-" + type,
          params: {
            id: this.user.userId
          },
          query: {
            idType: "userId"
          }
        })
      },
      logout() {
        this.$router.push("/")
        this.$store.commit("logout")
      },
      routeLink(){
        console.log(this.user)
        if (this.user.userData === "undefined") {
          return this.$router.push({name: "edit"})
        }

        this.loadProfile()
      }
    },
    computed: {
      loginState(){
        return this.$store.state.userConfig.token
      },
      user(){
        return this.$store.state.userConfig.baseUser
      }
    }
  };
</script>

<style lang="scss" scoped>
@import '@/globalStyles/variables.scss';
@import '@/globalStyles/helper.scss';

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

    a:not(:last-child), span{
      margin-right: var(--spacing);
    }
  }

  img{
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
}
</style>
