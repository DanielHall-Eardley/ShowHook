<template lang="html">
  <div class="show-summary">
    <div class='summary' v-if='!toggleEdit'>
      <span>{{show.date}}</span>
      <span>{{show.actName}}</span>
      <span>{{show.venueAddress}}</span>
      <span>$ {{show.price}}</span>
      <button>Get tickets</button>
    </div>
    <div v-else class='edit-summary'>
      <input type="text"
        class='default-input'
        name='date'
        placeholder="Date"
        v-on:input='updateShow($event)'>
      <input type="text"
        class='default-input'
        name='actName'
        placeholder="Artist/Band name"
        v-on:input='updateShow($event)'>
      <input type="text"
        class='default-input'
        name='venueAddress'
        placeholder='Address'
        v-on:input='updateShow($event)'>
      <input type="text"
        class='default-input'
        name='price'
        placeholder="Price"
        v-on:input='updateShow($event)'>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    show: Object,
    toggleEdit: Boolean
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
@import '@/globalStyles/mixins.scss';
@import '@/globalStyles/helper.scss';

.show-summary{
  margin: var(--spacing) 0px;
  .summary{
    padding: var(--spacing);
    border: solid .5px var(--alt-primary);
    span{
      display: block;
      font-size: 1.2rem;
      margin-bottom: var(--spacing);
    }
    button{
      @include ticket-button
    }
  }
  .edit-summary{
    border: dashed .5px var(--primary);
    padding: var(--spacing);
  }
}

</style>
