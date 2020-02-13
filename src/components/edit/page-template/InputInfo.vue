<template lang="html">
  <div class="input-info">
    <div>
      <svg>
        <use xlink:href="@/assets/sprite.svg#icon-info"></use>
      </svg>
      <p>{{getInfo}}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    getInfo(){
      return this.$store.getters.getComponent.info
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
  overflow-y: scroll;

  div{
    background: white;
    padding: var(--spacing);
    border-radius: var(--border-radius);
    
    p{
      font-size: 2rem;
      white-space: pre-line;
    }

    svg{
      width: 4rem;
      height: 4rem;
      fill: var(--primary);
      margin-bottom: var(--spacing);
      margin-left: -8px; 
    }
  }
}
</style>
