<template>
  <div class="menu" v-bind:style="menuPos">
    <DropDownMenu v-bind:menuContent="menuLinks"></DropDownMenu>
    <AppName></AppName>
    <div class='search'>
      <input :class="{'input-shown': showSearchInput}"
        v-model="search"
        class='search-input'
        v-on:keyup.enter="navigateToPage()">
      <router-link v-bind:to="toggleLink()">
        <svg v-on:click="toggleSearchInput()" class='search-icon'>
          <use xlink:href='@/assets/sprite.svg#icon-magnifying-glass'></use>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import AppName from "@/components/AppName.vue";
import DropDownMenu from "@/components/profile/DropDownMenu.vue";

export default {
  props: {
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
        return "/search?userSearch=" + this.search
      }else{
        return ""
      }
    },
    navigateToPage(){
      if(this.search !== ""){
        this.$router.push({path: '/search', query: {userSearch: this.search}})
      }else{
        this.showSearchInput = false
      }
    }
  },
  computed: {
    menuLinks() {
      return this.$store.state.appConfig.navMenu;
    },
  }
};
</script>

<style lang="scss">
@import '@/globalStyles/variables.scss';

.menu{
  background: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 5rem;
  align-items: center;
  border-bottom: solid 1px var(--secondary-six);
  padding: 0 var(--spacing);

  .search{
    justify-self: end;
    align-self: stretch;
    display: flex;
    align-items: center;
    overflow: hidden;

    a{
      margin-right: .5rem;
    }

    &-icon{
      height: 3rem;
      width: 3rem;
      fill: var(--alt-primary);
      transition: all .4s;
      position: relative;
      z-index: 1;

      &:hover{
        fill: var(--primary);
      }
    }

    &-input{
      border: none;
      outline: none;
      background-color: var(--secondary-six);
      height: 3.5rem;
      border-radius: var(--border-radius);
      text-indent: var(--spacing);
      width: 25vw;
      margin-right: -3.5rem;
      transform: translateX(120%);
      transition: all .3s;

      &:focus{
        background-color: lighten($secondary-six, 20%);
      }
    }
  }

  .input-shown{
    transform: translateX(0%);
  }
}
</style>

/*Notes from Jozef
*/
