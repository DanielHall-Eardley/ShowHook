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
      <input type="text"
        placeholder="Add more rules"
        v-model='ruleInput'>
      <button v-on:click='makeRule()'
        class='rule-add'>
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ruleInput: ''
    }
  },
  props:{
    page: Object,
  },
  methods:{
    toggleRule(bool, i){
      if(bool === this.page.options[i].enforced){
        return
      }else{
        this.page.options[i].enforced = !this.page.options[i].enforced
      }
      let filterArray = this.page.options.filter(rule => rule.enforced)
      this.$store.commit('submitRules', filterArray)
    },
    makeRule(){
      this.page.options = [
        ...this.page.options,
        {
          rule: this.ruleInput,
          enforced: true
        }
      ]
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

  input{
    height: 5vh;
    width: 50%;
    box-sizing: border-box;
  }

  .rule-add{
    height: 5vh;
    padding: 0px 20px;
  }
</style>
