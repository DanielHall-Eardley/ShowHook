<template>
  <div id="login-wrapper">
    <form @submit.prevent="sendUserDetails()" id="login">
      <h1>{{loginType === 'signUp' ? 'Get Started' : 'Login'}}</h1>
      <h3 v-show="loginType === 'signUp'? true : false">Register in 20 seconds</h3>
      <input v-if="loginType === 'signUp' ? true : false" placeholder="Name" v-model="userName">
      <input placeholder="Email" v-model="email" type="email">
      <input placeholder="Password" v-model="password" type="password" v-on:keyup="validate($event)">
      <select v-model="select" v-if="loginType === 'signUp' ? true : false">
        <option value>Choose Profile Type</option>
        <option value="User">User</option>
        <option value="Venue">Venue</option>
        <option value="Musician">Musician</option>
      </select>
      <div>
        <button>{{loginType === 'signUp' ? 'Register' : 'Login'}}</button>
        <button v-on:click="toggleLogin('back')">Back</button>
        <p>{{loginType === "signUp" ? "Already a member?" : "Not a member?"}}</p>
        <span v-if="loginType === 'signUp'" v-on:click="toggleLogin('login')">Log in here</span>
        <span v-else v-on:click="toggleLogin('signUp')">Sign up here</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    loginType: String,
    toggleLogin: Function
  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      select: ""
    };
  },
  methods: {
    sendUserDetails() {
      let newUser;
      if (this.loginType === "signUp") {
        newUser = {
          name: this.userName,
          email: this.email,
          password: this.password,
          select: this.select
        };
      } else if (this.loginType === "login") {
        newUser = {
          email: this.email,
          password: this.password
        };
      }
    this.$store.dispatch("sendUserDetails", newUser);
    },
    validate(e){
      console.log(e)
      //validate user details here
    }
  }
};
</script>

<style lang="scss">
@import "@/globalStyles/mixins.scss";

#login-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#login {
  opacity: 1;
  width: 35%;
  background: var(--alt-primary);
  border-radius: var(--border-radius);
  z-index: 2;
  h1,
  h3 {
    color: var(--text-color);
    text-align: center;
  }
  input,
  select {
    width: 60%;
    height: 30px;
    margin-bottom: 10px;
    margin-left: 20%;
    margin-right: 20%;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      @include button();
      margin-bottom: 10px;
    }
    p {
      color: var(--text-color);
      margin-bottom: 2px;
    }

    span {
      color: var(--text-color);
      margin-bottom: 10px;
    }
  }
}
</style>

