<template>
  <div class="login">
    <div class="error-container" v-if="getErrors">
      <p 
        class="error" 
        v-for="error in getErrors" 
        :key="error">
        {{error}}
      </p>
    </div>
    <form @submit.prevent="sendUserDetails()" class="login-form">
      <h1>
        {{loginType === 'signUp' ? 'Get Started' : 'Login'}}
      </h1>
      <h3 v-show="loginType === 'signUp'? true : false">
        Register in 20 seconds
      </h3>
      <input 
        :class="{invalid: $v.name.$error}"
        @blur="$v.name.$touch()"
        v-if="loginType === 'signUp' ? true : false"
        placeholder="Name"
        name="name"
        v-model="name"
        class="edit-input">
      <p class="invalid-label" v-if="$v.name.$error">
        Name must be at least 3 characters
      </p>  
      <input 
        :class="{invalid: $v.email.$error}"
        @blur="$v.email.$touch()"
        placeholder="Email"
        v-model="email"
        type="email"
        name="email"
        class="edit-input">
      <p class="invalid-label" v-if="$v.email.$error">
        Please enter a valid email
      </p>  
      <input 
        :class="{invalid: $v.password.$error}"
        @blur="$v.password.$touch()"
        placeholder="Password"
        type="password"
        name="password"
        v-model="password"
        class="edit-input">
      <p class="invalid-label" v-if="$v.password.$error">
        Please enter a valid password over 6 characters
      </p>    
      <select 
        :class="{invalid: $v.userType.$error}"
        @blur="$v.userType.$touch()"
        v-model="userType"
        v-if="loginType === 'signUp' ? true : false"
        name="userType"
        class="edit-input">
        <option selected disabled>Choose Profile Type</option>
        <option>User</option>
        <option>Venue</option>
        <option>Act</option>
      </select>
      <p class="invalid-label" v-if="$v.userType.$error">
        Please select a user type
      </p>  
      <button :disabled="$v.$error" class="primary-button">
        {{loginType === 'signUp' ? 'Register' : 'Login'}}
      </button>
      <router-link to="/" class="alt-button">
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
import {
  required, 
  minLength,
  email,
} from "vuelidate/lib/validators"

export default {
  data() {
    return {
      loginType: "",
      name: "",
      email: "",
      password: "",
      userType: ""
    };
  },
  computed: {
    getErrors() {
      return this.$store.state.userConfig.adminErrors
    },
  },
  methods: {
    sendUserDetails() {
      let userObject = {
        password: this.password,
        email: this.email,
        redirect: this.$route.query.redirect
      }

      if (this.loginType === "login") {
        return this.$store.dispatch("login", userObject);
      }

      userObject.name = this.name,
      userObject.userType = this.userType,

      this.$store.dispatch("signUp", userObject);
    },
    toggleLogin(switchType){
      this.$router.push({path: "admin", query: {type: switchType}})
    }
  },
  updated() {
    this.loginType = this.$route.query.type
  },
  validations: {
    email : {
      required,
      email
    },
    name: {
      required,
      minLength: minLength(3)
    },
    password: {
      required,
      minLength: minLength(6),
      /*custom: value => {
        /insert custom regex 
      }*/
    },
    userType: {
      required
    }
  },
  created() {      
    this.loginType = this.$route.query.type
  },
  watch: {
    "$route": function (to, from) {
      this.loginType = to.query.type
    }
  }
};
</script>

<style lang="scss">
@import "@/globalStyles/mixins.scss";
@import '@/globalStyles/helper.scss';

.login {
  width: 100vw;
  height: 100vh;

  .error {
    padding: var(--spacing);
    font-size: 2rem;
    color: white;
    background-color: red;
    text-align: center;
  }

  &-form {
    display: grid;
    grid-row-gap: var(--alt-spacing);
    justify-items: center;

    width: 35%;
    border-radius: var(--border-radius);
    border: solid .5px var(--primary);
    padding: var(--spacing);
    margin: var(--spacing) auto;

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

    input, select{
      height: 4rem;
    }
  }
}

.invalid {
  border: solid 2px red !important;
}
</style>
