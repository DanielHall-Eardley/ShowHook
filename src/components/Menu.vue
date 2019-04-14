<template>
  <div class="menu" v-bind:style="menuPos">
    <DropDownMenu v-bind:menuContent="menuLinks">
      <img src="https://via.placeholder.com/50">
    </DropDownMenu>
    <AppName></AppName>
    <div>
      <input v-if="showSearchInput" v-model="search">
      <router-link v-bind:to="toggleLink()">
        <img v-on:click="toggleSearchInput()" src="https://via.placeholder.com/50">
      </router-link>
    </div>
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
.menu {
  background: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  img{
    height: 60%;
    object-fit: contain;
  }
  div:last-of-type{
    display: flex;
    padding-right: var(--spacing);
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
