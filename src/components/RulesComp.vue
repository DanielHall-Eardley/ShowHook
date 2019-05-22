<template lang="html">
  <div class="rules-container">
    <div class='rule' v-for='(r, i) in page.options'>
      <span>{{r.rule}}</span>
      <button class='left-button'
        v-bind:class='{highlight: !r.enforced}'
        v-on:click='toggleRule(false, i)'>
        No
      </button>
      <button class='right-button'
        v-bind:class='{highlight: r.enforced}'
        v-on:click='toggleRule(true, i)'>
        Yes
      </button>
    </div>
    <div class='rule'>
      <input type="text" placeholder="Add more rules">
      <button>Add</button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    page: Object
  },
  methods:{
    toggleRule(bool, i){
      if(bool === this.page.options[i].enforced){
        return
      }else{
        this.page.options[i].enforced =
        !this.page.options[i].enforced
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .rule{
    margin: var(--spacing);
    span{
      display: inline-block;
      width: 50%;
    }
  }

  .right-button{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
    border-left: solid 0.5px black;
    padding: 4px 15px;
    outline: none;
  }

  .left-button{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 4px 15px;
    border: none;
    outline: none;
  }

  .highlight{
    background-color: var(--primary);
    color: white;
  }
</style>
