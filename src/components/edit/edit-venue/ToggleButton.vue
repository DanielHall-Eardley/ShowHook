<template>
  <div class="rule-button">
    <span>{{value}}</span>
    <button @click="submit(false)" :class="{active: active === null ? '' : !active}">
      No
    </button>
    <button @click="submit(true)" :class="{active: active}">
      Yes
    </button>
  </div>
</template>

<script>
  export default {
    props: ["value"],
    data() {
      return {
        active: null
      }
    },
    methods: {
      submit(boolean) {
        this.$store.commit("addVenueRules", {
          rule: this.value,
          enforced: boolean
        })

        this.active = boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rule-button {
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