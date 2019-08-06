<template>
  <div class="dropdown-menu">
    <div class="dropdown-menu-icon-box" v-on:click='toggleMenu()'>
      <span class="dropdown-menu-icon" :class="{'rotate-top': dropdown}"></span>
      <span class="dropdown-menu-icon" :class="{'remove-mid': dropdown}"></span>
      <span class="dropdown-menu-icon" :class="{'rotate-bot': dropdown}"></span>
    </div>
    <div :class="{'show-menu': dropdown}" class="dropdown-menu-links">
      <a v-bind:key="item.name" v-for='item in menuContent' v-bind:url="item.url">{{item.name}}</a>
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
  @import '@/globalStyles/variables.scss';

  .dropdown-menu{
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    &-icon-box{
      height: 3.5rem;
      width: 4rem;
      display: grid;
      align-items: center;
    }

    &-icon-box:hover &-icon{
      background-color: var(--primary);
    }

    &-icon{
      height: 2px;
      width: 3.5rem;
      background-color: $alt-primary;
      display: block;
      transition: all .4s;
    }

    &-links{
      position: absolute;
      top: 5rem;
      padding: var(--spacing);
      z-index: 1;
      border: solid 1px var(--primary);
      background-color: #fff;
      transform: scale(0);
      transition: all .4s;

      a{
        display: block;
        text-decoration: none;
        color: black;
        font-size: 1.7rem;
        cursor: pointer;

        &:hover {
          color: var(--primary)
        }

        &:active {
          color: var(--alt-primary)
        }

        &:not(:last-child){
          margin-bottom: 1rem;
        }
      }
    }
  }

  .rotate-top{
    transform: rotate(135deg) translate(.8rem, -.8rem);
    background-color: var(--primary);
  }

  .remove-mid{
    opacity: 0;
  }

  .rotate-bot{
    transform: rotate(-135deg) translate(.8rem, .8rem);
    background-color: var(--primary);
  }

  .show-menu{
    transform: scale(1);
  }
</style>
