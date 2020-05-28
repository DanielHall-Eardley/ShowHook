<template>
  <main>
    <Menu></Menu>
    <Error></Error>
    <section>{{showSummary}}</section>
  </main>
</template>

<script>
import Menu from '@/components/shared/Menu'
import Error from '@/components/shared/Error'
import getAdminDataFn from "@/helper/getAdminDataFn"

export default {
  async created() {
    this.$store.commit("clearError")
    await this.$store.dispatch('autoLogin', this.$route.fullPath)
    const userId = this.$route.params.id
    const token = this.$store.state.token
    const searchType = this.$route.query.searchType
   
    const responseData = await getAdminDataFn(`show/summary/${userId}?searchType=${searchType}`, token)

    if (responseData.messages) {
      this.$store.commit("updateError", responseData)
    }

    this.$store.commit('loadShowSummary', responseData)
  },
  components: {
    Menu,
    Error
  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    showSummary() {
      const showList = this.$store.state.showSummary
      console.log(showList)
      return showList 
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
