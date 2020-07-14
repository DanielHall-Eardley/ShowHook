<template>
  <nav class="menu">
    <AppName></AppName>
    <div class="logged-out" v-if="!loginState">
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
    <div 
      class="act-or-venue" 
      v-if='loginState && (user.userType.toLowerCase() === "act" || user.userType.toLowerCase() === "venue")'>
      <router-link 
        class="default-link"
        :to="{name: 'admin-profile', params: {id: user.userId}}">
        {{user.name}}
      </router-link>
      <span
        class="default-link"
        @click="routeLink">
        {{user.userType}}
      </span>
      <router-link 
        class='default-link'
        :to='{name: "join-act", params: {id: user.userId}}'
        v-if='user.userType.toLowerCase() === "act"'>
        Join Existing Act
        </router-link>
      <router-link 
        class="default-link"
        :to="{ name: 'booking-summary', params: {id: user.userId}}">
        Bookings
      </router-link>
      <router-link 
        class="default-link"
        :to="{ 
          name: 'show-summary', 
          params: {id: user.userData}
        }">
        Shows
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
    <div class="showgoer" v-if='loginState && user.userType.toLowerCase() === "showgoer"'>
      <router-link 
        class="default-link"
        :to="{name: 'admin-profile', params: {id: user.userId}}">
        {{user.name}}
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
        return this.$store.state.token
      },
      user(){
        return this.$store.state.baseUser
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

  img{
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
}

.logged-out, .act-or-venue, .showgoer{
    margin-left: auto;
    display: flex;
    align-items: center;

    a:not(:last-child), span{
      margin-right: var(--spacing);
    }
  }
</style>
