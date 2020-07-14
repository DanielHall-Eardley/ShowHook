export default {
  methods: {
    async checkLogin() {
      this.$store.commit('clearError')

      const loggedIn = await this.$store.dispatch('checkLogin')
      
      if (!loggedIn) {
        this.$router.push({
          name: 'admin',
          query: {
            type: 'login',
            redirect: this.$route.fullPath
          }
        })
      }
    }
  }
}