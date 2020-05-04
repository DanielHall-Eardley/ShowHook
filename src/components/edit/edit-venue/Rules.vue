<template>
  <section class="venue-rules">
    <h3 v-if="!editable" class="section-heading">Venue rules</h3>
    <div class="venue-rules-container">
      <ToggleButton 
        v-for="rule in ruleArray" 
        :value="rule"
        :key="rule">
      </ToggleButton>
    </div>
    <div class="add-rule-container">
      <input 
        type="text" 
        placeholder="Add a new rule for your venue"
        v-model="newRule"  
        class="default-input"
      >
      <button @click="addRule">Add</button>
    </div>
  </section>
</template>

<script>
  import ToggleButton from "./ToggleButton"

  export default {
    props: ["editable"],
    components: {
      ToggleButton 
    },
    data() {
      return {
        newRule: "",
        ruleArray: [
          "All ages",
          "Smoking",
          "Alcohol"
        ]
      }
    },
    methods: {
      addRule() {
        for (let r of this.ruleArray) {
          if (r === this.newRule) return
        }

        this.ruleArray.push(this.newRule)
        this.newRule = ""
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/mixins.scss";

  .venue-rules {

    &-container {
      margin-bottom: var(--spacing);
      display: grid;
      grid-row-gap: var(--spacing);
    }

    input {
      height: 4rem;
      margin-right: var(--spacing);
      font-size: 1.6rem;
    }

    button {
      ;
      width: 16rem;
    }

    .add-rule-container {
      display: flex;
    }
  }
</style>    