<template lang="html">
  <div class="search-header">
    <h1>ssh.</h1>
    <input v-on:input='addFilters($event)' placeholder="Anywhere" type="text">
    <input v-on:input='addFilters($event)' placeholder="Anytime" type="text">
    <input v-on:input='addFilters($event)' placeholder="Any Genre" type="text">
    <router-link :to="{ name: 'landing', params: {action: 'login'} }">
      Log in
    </router-link>
    <router-link :to="{ name: 'landing', params: {action: 'signUp'} }">
      Sign up
    </router-link>
  </div>
</template>

<script>
export default {
  methods:{
    addFilters(e){
      let payload = {}
      switch(e.target.placeholder){
        case 'Anywhere':
        payload.date = e.target.value
        break
        case 'Anytime':
        payload.time = e.target.value
        break
        case 'Any Genre':
        payload.genre = e.target.value
        break
      }
      this.$store.commit('addToSearchQuery', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-header{
    display: flex;
    h1{
      flex: 1;
    }
    input{
      flex: 1;
      height: 5vh;
      box-sizing: border-box;
      border: solid 0.5px var(--alt-primary);
      background-image: url('https://via.placeholder.com/100');
      text-indent: 20%;
      background-size: contain;
      background-repeat: no-repeat;
    }
    input:focus{
      background-image: none;
      text-indent: 2%;
    }
    input:first-of-type{
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    input:last-of-type{
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    a{
      flex: 0.5;
      text-align: center;
    }
  }

</style>
