<template>
  <div v-on:click='toggleMenu()'>
    <slot></slot>
    <div v-show="dropdown" id="dropdown-menu">
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
  #dropdown-menu{
    position: relative;
    background: var(--secondary-five);
    padding: var(--spacing);
    z-index: 1;
    margin-left: var(--spacing);
    a{
      display: block;
    }
  }
</style>
