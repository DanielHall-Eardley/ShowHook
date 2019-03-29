<template>
  <div id="landing-page">
    <Login v-bind:loginType="loginType" v-bind:toggleLogin="toggleLogin" v-if="loginState"></Login>
    <header>
      <AppName></AppName>
      <nav>
        <router-link to="howitworks">How it works</router-link>
        <span class="fake-link" v-on:click="toggleLogin('login')">Login</span>
        <span class="fake-link" v-on:click="toggleLogin('signUp')">Sign Up</span>
      </nav>
    </header>
    <div id="banner-container-landing">
      <Banner v-bind:banner="getMainBanner.src"></Banner>
    </div>
    <div id="landing-page-text">
      <p id="banner-desc">
        <b>Book
          <br>your next
          <br>Show
        </b>
      </p>
      <SearchLink></SearchLink>
      <div id="banner-label-container">
        <span id="banner-label">{{getMainBanner.description}}</span>
        <button>
          <router-link to="help">Help</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppName from "@/components/AppName.vue";
import Banner from "@/components/Banner.vue";
import SearchLink from "@/components/SearchLink.vue";
import Login from "@/components/Login.vue";

export default {
  components: {
    AppName,
    Banner,
    SearchLink,
    Login
  },
  data() {
    return {
      loginState: false,
      loginType: ""
    };
  },
  computed: {
    getMainBanner() {
      return this.$store.state.appConfig.mainBanner;
    }
  },
  methods: {
    toggleLogin(type) {
      this.loginType = type;
      if (type === "back") {
        this.loginState = false;
      } else {
        this.loginState = true;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/globalStyles/mixins.scss";

#landing-page {
  height: 100%;
  padding: 4% 8%;
  box-sizing: border-box;
  header {
    display: flex;
    justify-content: space-between;
  }

  nav {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    a,
    span {
      margin-left: 5%;
    }
  }
}

#landing-page-text {
  display: flex;
  flex-direction: column;
  height: 87%;
  padding-left: 40px;
  margin: 0px;
}

#banner-label-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1.5;
  button {
    @include button();
    a {
      color: var(--text-color)
     }
  }
}

#banner-container-landing{
  width: 70%;
  height: 77.5vh;
  float: left;
}

#banner-label {
  font-size: 0.8rem;
  flex: 0.5;
}

#banner-desc {
  font-size: 2rem;
  flex: 3;
}
</style>
