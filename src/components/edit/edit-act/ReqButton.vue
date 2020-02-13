<template>
  <div class="req-button">
    <span>{{value}}</span>
    <button 
      @click="submit('requirement')" 
      :class="selected === 'requirement' ? 'active' : null">
      Requirement 
    </button>
    <button 
      @click="submit('preference')"
      :class="selected === 'preference' ? 'active' : null">
      Preference
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return{
      selected: null
    }
  },
  props: ["value"],
  methods: {
    submit(selectType) {
      this.$store.commit("addActReqOrPref", {
        type: selectType,
        value: this.value
      })

      this.selected = selectType
    }
  }
}
</script>

<style lang="scss" scoped>
  .req-button {
    display: flex;
    align-items: center;
    span {
      font-size: 1.6rem;
      margin-right: auto
    }

    button {
      padding: .8rem 2rem;
      border: solid var(--primary) 1px;
      background-color: transparent;
      outline: none;
    }

    button:first-of-type {
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
      border-right: none;
    }

    button:last-of-type {
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }

    .active {
      background-color: var(--primary);
      color: white;
    }
  }
</style>