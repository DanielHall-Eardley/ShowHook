<template lang="html">
  <div id='input-comp'>
    <div v-for='option in page.options'
      class='input-container'
      v-bind:style='option.style'
      v-bind:class='addMargin(option.style.width)'>
      <select v-if='option.type === "select"'
        v-on:input='updateUserProfile($event)'
        v-bind:placeholder='option.name'
        required>
        <option v-for='choice in option.selectOptions'>
          {{choice}}
        </option>
      </select>
      <div v-else-if="option.type === 'card'"
        class='card-container'>
        <img v-show='option.img' v-bind:src="option.img" alt="venue icon">
        <span>{{option.placeholder}}</span>
      </div>
      <textarea
        v-else-if='option.type === "textarea"'
        v-on:input='updateUserProfile($event)'
        v-bind:placeholder='option.name'
        required>
      </textarea>
      <div v-else-if='option.type === "checkbox" || option.type === "radio"'
        class='checkbox-container'>
        <label v-html='formatText(option.placeholder)'>
        </label>
        <input
        v-bind:name='option.tag'
        v-bind:value='option.placeholder'
        v-on:input='updateUserProfile($event)'
        v-bind:type="option.type"
        v-bind:id='option.name'>
      </div>
      <input v-else
        v-bind:placeholder='option.placeholder'
        v-on:input='updateUserProfile($event)'
        v-bind:type='option.type'
        v-bind:name='option.name'
        v-bind:id='option.tag'
        required>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    page: Object
  },
  methods:{
    updateUserProfile(e){
      this.$store.commit('updateUserProfile', e)
    },
    addMargin(width){
      if(parseInt(width) < 100){
        return 'add-margin'
      }
    },
    formatText(str){
      let formattedString = ''
      for(let l of str){
        if(l === '*'){
          formattedString += "<br/>"
        }else{
        formattedString += l
        }
      }
      return formattedString
    }
  }
}
</script>

<style lang="scss" scoped>
  #input-comp{
    margin-left: 0px;
    padding: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    div.input-container{
      display: inline-block;
      margin-bottom: var(--spacing);
      height: 100%;
      width: 100%;
    }

    div.card-container{
      @extend div.input-container
    }

    textarea{
      height: 100%;
      width: 100%;
    }

    div.checkbox-container{
      height: 100%;
      display: flex;
      align-items: center;
      border-bottom: solid 0.5px var(--primary);
    }

    label{
      flex: 5;
    }

    select, input{
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    input[type=radio], input[type=checkbox]{
      width: 20px;
      height: 20px;
      flex: 1
    }

    img{
      object-fit: contain;
      height: 100%;
      margin-right: var(--spacing)
    }
  }


</style>
