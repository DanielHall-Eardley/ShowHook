<template>
  <section class="requirements">
    <h3 v-if="!editable" class="section-heading">
      Requirements and Preferences
    </h3>
    <div class="act-reqandpref-container">
      <ReqButton 
        :value="rp" 
        v-for="rp in reqAndPref"
        :key="rp">
      </ReqButton>
    </div>
    <div class="add-reqandpref-container">
      <input 
        type="text" 
        placeholder="Add a new requirement or preference"
        v-model="newReq"  
        class="default-input"
      >
      <button @click="addReqAndPref" class="primary-button">
        Add
      </button>
    </div>
  </section>
</template>

<script>
  import ReqButton from "./ReqButton"

  export default {
    props: ["editable"],
    components: {
      ReqButton 
    },
    data() {
      return {
        newReq: "",
        reqAndPref: []
      }
    },
    methods: {
      addReqAndPref() {
        for (let rp of this.reqAndPref) {
          if (rp === this.newReq) return
        }

        this.reqAndPref.push(this.newReq)
        this.newReq = ""
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .requirements {
    .add-reqandpref-container {
      display: flex;
      margin: var(--alt-spacing) 0;

      button {
        margin-left: var(--spacing);
        width: 14rem;
      }
    }

    input {
      height: 4rem;
    }

    .act-reqandpref-container {
      display: grid;
      grid-row-gap: var(--alt-spacing);
    }
  }
</style>