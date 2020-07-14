<template>
  <main>
    <Menu></Menu>
    <Error></Error>
    <button class='time-travel' @click='past = true' v-show='!past'>
      Travel back into the past...
    </button>
    <section class='show-section' v-if="past">
      <h2>{{showSummary.past.title}}</h2>
      <div class="flex-container">
        <ShowSummary 
          v-for='show in showSummary.past.shows' 
          :key='show._id'
          :show='show'>
        </ShowSummary>      
      </div>
    </section>
    <section 
      v-for='section in showSummary.future' 
      :key='section.title'
      class='show-section'>
      <h2>{{section.title}}</h2>
      <div class="flex-container">
        <ShowSummary 
          v-for='show in section.shows' 
          :key='show._id'
          :show='show'>
        </ShowSummary>      
      </div>
    </section>
  </main>
</template>

<script>
import Menu from '@/components/shared/Menu'
import Error from '@/components/shared/Error'
import ShowSummary from '@/components/shows/ShowSummary'
import getAdminDataFn from "@/helper/getAdminDataFn"

export default {
  async created() {
    this.$store.commit("clearError")
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
    
    const actOrVenueId = this.$route.params.id
    const token = this.$store.state.token
   
    const response = await getAdminDataFn(`show/summary/${actOrVenueId}`, token)

    if (response.error) {
      this.$store.commit("updateError", response)
    }

    this.$store.commit('loadShowSummary', response)
  },
  components: {
    Menu,
    Error,
    ShowSummary
  },
  data() {
    return {
      past: false
    }
  },
  methods: {

  },
  computed: {
    showSummary() {
      return this.$store.getters.getShowSummary
    }
  }
}
</script>

<style lang='scss' scoped>
  .show-section {
    width: 100%;

    h2 {
      background-color: var(--primary);
      color: white;
      text-align: center;
      padding: var(--alt-spacing);
    }
  }

  .time-travel {
    width: 100%;
    padding: var(--alt-spacing);
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--alt-primary);

    &:hover {
      color: var(--primary);
    }
  }

  .flex-container {
    width: 100%;
    display: flex;
    padding: var(--spacing);
    overflow-x: auto;
  }
</style>
