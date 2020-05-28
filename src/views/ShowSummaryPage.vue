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
    const userType = this.$route.query.userType
   
    const responseData = await getAdminDataFn(`show/summary/${userId}?userType=${userType}`, token)

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
      //compare showDate to now and get the difference in days
      //sort the shows into their sections
      //sort the individual section arrays

      const showList = this.$store.state.showSummary
      console.log(showList)
      const sectionArray = [
        {
          title: 'Past',
          shows: []
        },
        {
          title: 'This Week',
          shows: []
        },
        {
          title: 'This Month',
          shows: []
        },
        {
          title: 'This Year',
          shows: []
        },
      ]

      for(let show in showList) {
        const now = new Date()
        if (show.showDate < now) {
          sectionArray[0].shows.push(show)
        }

        const getDays = 
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
