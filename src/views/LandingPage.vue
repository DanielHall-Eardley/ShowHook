<template>
  <div id="landing-page">
    <Menu></Menu>
    <SearchLink></SearchLink>
  </div>
</template>

<script>
import SearchLink from "@/components/landing/SearchLink.vue";
import Menu from "@/components/shared/Menu.vue";

export default {
  components: {
    Menu,
    SearchLink,
  },
  created() {
    const token = this.$store.state.token
    if(!token) {
      this.$store.commit("autoLogin")
    }
  },
};
</script>

<style lang="scss">
@import "@/globalStyles/mixins.scss";

#landing-page {

}
</style>

/*Notes from Jozef
*/
