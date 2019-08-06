<template lang="html">
  <div class="show-text">
    <p v-if='!toggleEdit'>{{show.text}}</p>
    <textarea v-on:input='updateShow($event)'
    v-else
    name='text'
    placeholder="Add some text...">
  </textarea>
  </div>
</template>

<script>
export default {
  props:{
    toggleEdit: Boolean,
    show: Object
  },
  methods:{
    updateShow(e){
      let payload = {
        id: this.show.id,
        name: e.target.name,
        value: e.target.value
      }
      this.$store.commit('updateShow', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
  .show-text{
    p{
      font-size: 1.2rem;
    }
    textarea{
      box-sizing: border-box;
      width: 100%;
      min-height: 15vh;
      border: dashed .5px var(--primary);
    }
  }
</style>
