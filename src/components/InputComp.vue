<template lang="html">
  <div id='input-comp'>
    <label v-for='option in page.options'>
      {{option.name}}
      <select v-if='option.type === "select"'
        v-model='input'
        required>
        <option v-for='choice in option.selectOptions'>
          {{choice}}
        </option>
      </select>
      <textarea v-else-if='option.type === "textarea"'
        v-model='input'
        required>
      </textarea>
      <input v-else v-model='input'
      v-bind:type="option.type"
      required>
    </label>
  </div>
</template>

<script>
export default {
  props:{
    page: Object
  },
  data(){
    return{
      input: ""
    }
  }
}
</script>

<style lang="scss" scoped>
  #input-comp{
    display: flex;
    margin-left: 0px;
    padding: 0px;
  }
</style>
