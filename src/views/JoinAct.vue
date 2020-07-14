<template>
  <main class='join-act'>
    <form v-on:submit.prevent='searchForAct(searchQuery)'>
      <input 
        aria-label='Search for an act you wish to join by title'
        class='default-input' 
        type="text" 
        placeholder="Enter the title of the act you wish to join"
        v-model='searchQuery'>
      <button class='primary-button'>Search</button>
      <router-link class='default-link' to='/'>Back</router-link>
    </form>
    <Error/>
    <ul class='results'>
      <li v-for='act in results' :key='act._id'>
        {{act.title}} 
        <button class='primary-button' @click='requestToJoinAct(act._id)'>Request to join</button>
      </li>
    </ul>
  </main>
</template>

<script>
import getDataFn from '../helper/getDataFn'
import postDataFn from '../helper/postDataFn'
import Error from '../components/shared/Error'

export default {
  data() {
    return {
      searchQuery: '',
      results: []
    }
  },
  components: {
    Error
  },
  methods: {
    async searchForAct(searchQuery) {
      this.$store.commit('clearError')
      const response = await getDataFn('/search/join-act/' + searchQuery)

      if (response.error) {
        return this.$store.commit('updateError', response)
      }
      this.results = response
      this.searchQuery = ''
    },
    async requestToJoinAct(actId) {
      this.$store.commit('clearError')
      const token = this.$store.state.token
      if (!token) {
        await this.$store.commit('autoLogin', this.$route.fullPath)
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }

      const body = JSON.stringify({
        actId,
        userId: this.$store.state.baseUser.userId
      })

      const response = await postDataFn('/request/join-act', body, headers, 'POST')
    
      if (response.error) {
        return this.$store.commit('updateError', response)
      }

      alert(response.msg)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .join-act form {
    display: flex;
    border-bottom: var(--light-border);
    padding: var(--spacing);
    align-items: center;
  }

  .join-act form input {
    width: 45rem;
  }

  .join-act form button {
    margin-left: var(--spacing);
  }

  .join-act form a {
    margin-left: auto;
  }

  .results {
    padding: var(--spacing);
    list-style: none;
  }

  .results li {
    background-color: var(--light-grey);
    padding: var(--alt-spacing);
    border-radius: var(--border-radius);
    font-size: 1.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--alt-spacing);
  }
</style>