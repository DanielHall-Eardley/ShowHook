<template>
  <div id="menu" v-bind:style="menuPos">
    <DropDownMenu v-bind:menuContent="menuLinks">
      <img src="https://via.placeholder.com/50">
    </DropDownMenu>
    <AppName></AppName>
    <input v-if="showSearchInput" v-model="search">
    <router-link v-bind:to="toggleLink()">
      <img v-on:click="toggleSearchInput()" src="https://via.placeholder.com/50">
    </router-link>
  </div>
</template>

   <script>
import AppName from "@/components/AppName.vue";
import DropDownMenu from "@/components/DropDownMenu.vue";

export default {
  props: {
    menuLinks: Array,
    menuPos: Object,
  },
  components: {
    AppName,
    DropDownMenu
  },
  data(){
    return {
      search: "",
      showSearchInput: false
    }
  },
  methods: {
    toggleSearchInput(){
      this.showSearchInput = !this.showSearchInput
    },
    toggleLink(){
      if(this.search !== ""){
        return "/home/" + this.search
      }else{
        return ""
      }
    }
  }
};
</script>

<style lang="scss">
#menu {
  display: flex;
  div{
    flex:1;
  }
  img, input{
    margin: 1rem;
  }
}
</style>
