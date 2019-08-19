<template>
  <div class="login">
    <form @submit.prevent="sendUserDetails()" class="login-form">
      <h1>
        {{loginType === 'signUp' ? 'Get Started' : 'Login'}}
      </h1>
      <h3 v-show="loginType === 'signUp'? true : false">
        Register in 20 seconds
      </h3>
      <input v-if="loginType === 'signUp' ? true : false"
        placeholder="Name"
        v-on:input="updateUserDetails($event)"
        class="edit-input">
      <input placeholder="Email"
        v-on:input='updateUserDetails($event)'
        type="email"
        class="edit-input">
      <input placeholder="Password"
        type="password"
        v-on:input='updateUserDetails($event)'
        class="edit-input">
      <select v-on:input='updateUserType($event)'
        v-if="loginType === 'signUp' ? true : false"
        name="userType"
        class="edit-input">
        <option>Choose Profile Type</option>
        <option>User</option>
        <option>Venue</option>
        <option>Act</option>
      </select>
      <button>
        {{loginType === 'signUp' ? 'Register' : 'Login'}}
      </button>
      <router-link to="/" class="button">
        Back
      </router-link>
      <p>
        {{loginType === "signUp" ? "Already a member?" : "Not a member?"}}
      </p>
      <a v-if="loginType === 'signUp'"
        v-on:click="toggleLogin('login')"
        class="login-form-link">
        Log in here
      </a>
      <a v-else v-on:click="toggleLogin('signUp')"
        class="login-form-link">
        Sign up here
      </a>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input:"",
      loginType: "signUp"
    };
  },
  methods: {
    updateUserDetails(e){
      this.$store.dispatch("updateBasicDetails", e)
    },
    updateUserType(e){
      this.$store.dispatch("updateUserType", e)
    },
    sendUserDetails() {
      this.$store.dispatch("sendUserDetails");
    },
    toggleLogin(login){
      this.loginType = login
    }
  },
  created(){
    this.loginType = this.$route.params.loginType
    console.log(this.$route.params.loginType)
  }
};
</script>

<style lang="scss">
@import "@/globalStyles/mixins.scss";
@import '@/globalStyles/helper.scss';

.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &-form {
    display: grid;
    grid-row-gap: var(--alt-spacing);
    justify-items: center;

    width: 35%;
    border-radius: var(--border-radius);
    border: solid .5px var(--primary);
    padding: var(--spacing);

    button, .button{
      @include button;
      text-decoration: none;
      font-size: 1.6rem;
    }

    &-link{
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
    }
  }
}
</style>
