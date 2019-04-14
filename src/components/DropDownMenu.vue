<template>
  <div class="dropdown-menu-container" v-on:click='toggleMenu()'>
    <slot></slot>
    <div v-show="dropdown" class="dropdown-menu">
      <a v-bind:key="menuContent.name" v-for='menuItem in menuContent' v-bind:url="menuItem.url">{{menuItem.name}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    menuContent: Array
  },
  data(){
    return{
      dropdown: false
    }
  },
  methods:{
    toggleMenu(){
      this.dropdown = !this.dropdown
    }
  }
};
</script>

<style lang='scss'>
  .dropdown-menu-container{
    display: flex;
    padding-left: var(--spacing);
    align-items: center;
    position: relative;
  }
  .dropdown-menu{
    position: absolute;
    bottom: -83%;
    background: var(--secondary-four);
    padding: var(--spacing);
    z-index: 1;
    display: flex;
    flex-direction: column;
  }
</style>
