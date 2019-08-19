<template lang="html">
  <div class="input-info">
    <div>
      <img src="https://via.placeholder.com/50" alt="information icon">
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    getPage(){

    },
  },
  methods:{
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

<style lang="scss">
.input-info{
  grid-column: 2 / span 1;
  grid-row: 1 / span 3;
  background: var(--light-grey);
  padding: var(--spacing);
  
  div{
    background: white;
    padding: var(--spacing);
    border-radius: var(--border-radius);
  }
}
</style>
